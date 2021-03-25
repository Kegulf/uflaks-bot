import { HTTPError, Message, MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { time } from 'node:console';
import { ValidPlace, ValidPlaces, WeatherTimeEntry } from '../../data/models/weather.types';
import { WeatherApiProxy } from '../../data/proxies/weather.api';
import { capitalizeString } from '../../utils/text.util';

type WeatherCommandArgs = {
  placeName: string,
}

export class WeatherCommand extends Command {
  
  constructor(client: CommandoClient) {
    super(client, {
      name: 'vær', // command name/keyword
      group: 'frisbee', // belongs to which command group
      memberName: 'vær', // command id within its group
      description: 'Lister ut frisbeeværet',
      args: [
        {
          key: 'placeName',
          label: 'placeName',
          prompt: 'Lokasjonen til frisbeegolfbanen',
          type: 'string',
          default: '',
          oneOf: Object.keys(WeatherApiProxy.validPlaces),
        },
      ],
    });
  }

  createAllCoursesEmbed() {
    const notValidPlaceMessage =
      `Du må spesifisere en gyldig frisbeebane.\nFølgende baner er støttet: ${this.getValidPlacesString()}`;
    
    return new MessageEmbed()
      .setTitle('Støttede frisbeebaner')
      .setDescription(`Velg en bane:\n\`\`\`${this.getValidPlacesString()}\`\`\``);
  }

  async run(msg: CommandoMessage, { placeName }: WeatherCommandArgs ): Promise<Message> {  
    const allCoursesEmbed = this.createAllCoursesEmbed();
    if (!placeName) return msg.channel.send(allCoursesEmbed);

    const place = WeatherApiProxy.validPlaces[placeName.toLowerCase()];
    if (!place) return msg.channel.send(allCoursesEmbed);

    try {
      const { timeseries } = await WeatherApiProxy.getWeatherData(place);
      return msg.channel.send(
        this.createSingleCourseEmbed({ timeseries, place, placeName })
      );
    } catch (error) {
      if (error instanceof HTTPError && error.code === 429) {
        return msg.say(error.message);
      }
      console.error(error);
    }

    return msg.say('');
  }

  getValidPlacesString() {
    return Object.keys(WeatherApiProxy.validPlaces)
      .map((place, index) => `\n${index + 1}. ${capitalizeString(place)}`)
      .reduce((prev, val) => prev += val);
  }

  getWeatherDetailsFromTimeEntry(entry: WeatherTimeEntry) {
    const { instant, next_1_hours } = entry.data;
    
    const time_to_display = entry.time.split('T')[1].substr(0, 5);
    const { symbol_code } = next_1_hours.summary;
    const { precipitation_amount } = next_1_hours.details;
    const { air_temperature, wind_speed } = instant.details;

    return {
      wind_speed,
      symbol_code,
      air_temperature,
      time_to_display,
      precipitation_amount,
    };
  }

  createSingleCourseEmbed({ place, placeName, timeseries }: SingleCourseEmbedArgs ) {
    const currentWeatherEntry = timeseries[1];    
    const {
      air_temperature,
      wind_speed,
      precipitation_amount,
      symbol_code,
    } = this.getWeatherDetailsFromTimeEntry(currentWeatherEntry);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Været ved ${capitalizeString(placeName)} Frisbeegolfbane`)
      .setURL(`https://www.pent.no/${place.lat},${place.lon}`)
      .setAuthor(
        'Værdata fra Meterologisk institutt',
        'https://api.met.no/images/logo_2013_no.png',
        'https://api.met.no/index_no.html'
      )
      .addFields(
        { name: 'Temp', value: `${air_temperature}°C`, inline: true },
        { name: 'Vindhastiget', value: `${wind_speed} m/s`, inline: true },
        { name: 'Nedbør neste timen', value: `${precipitation_amount} mm`, inline: true }
      )

      let weatherTheNextHours = '\`\`\`';

      for (let i = 1; i < 6; i += 1) {
        const {
          air_temperature,
          wind_speed,
          precipitation_amount,
          symbol_code,
          time_to_display,
        } = this.getWeatherDetailsFromTimeEntry(timeseries[i]);
        
        const time = time_to_display;
        const temp = air_temperature.toFixed(1);
        const wind = wind_speed.toFixed(1);
        const rain = precipitation_amount.toFixed(1);

        weatherTheNextHours += 
          `${time}:\t${temp}°C\t${wind} m/s\t${rain} mm\n`;

      }

      embed.addField('Været de neste timene', `${weatherTheNextHours}\`\`\``);
      return embed;
  
  }
}


type SingleCourseEmbedArgs = {
  timeseries: WeatherTimeEntry[],
  placeName: string,
  place: ValidPlace,
}