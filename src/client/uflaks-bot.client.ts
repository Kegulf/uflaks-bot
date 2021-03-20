import { TextChannel } from 'discord.js';
import { CommandoClient, CommandoClientOptions } from 'discord.js-commando';

import { commandGroups } from '../commands/commandGroups';
import {
  // Basic commands
  HeiCommand,
  QuoteCommand,
  SvadaCommand,

  // Server-info commands
  ValheimCommand,
  
  // Frisbee commands
  WeatherCommand,
} from '../commands';


export class UlfaksbotClient extends CommandoClient {

  constructor(options?: CommandoClientOptions) {
    super(options);

    this.setRegistryDefaults();
    this.setEventListeners();
    
  }

  setRegistryDefaults(): void {
    // The registry property of the client handles active commands and their configurations
    this.registry
      .registerDefaults()
      .registerGroups(commandGroups)
      .registerCommands([
        // Basic commands
        HeiCommand,
        QuoteCommand,
        SvadaCommand,

        // Server info commands
        ValheimCommand,

        // FrisbeeCommands
        WeatherCommand,
      ]);
  }

  /**
  * @ignore
  * Sets various event listeners that demonstrate the power of the Discord API
  */
  setEventListeners(): void {
    this.on('ready', () => {
      console.log(`Logged in to: ${this.guilds.cache.array().join(', ')}`);
      this.setAnnoyingTimers();
    });

    this.on('message', msg => {
      const { content, author } = msg;
      const isBotAuthor = author.bot;

      if (isBotAuthor) return;

      const isTired = content.toLowerCase().indexOf('trøtt') !== -1;
      const isUflaks = content.toLowerCase().indexOf('uflaks') !== -1;

      if (isTired) msg.channel.send('Ska du ha nokke KAFFI? :coffee:');
      if (isUflaks) msg.channel.send('Ja det vart Uflaks! :panda_face:');
      console.log(msg.content);
      console.log('hei');
    });

    this.on('messageDelete', msg => {
      const authoredByBot = msg.author?.id === this.user?.id;
      if (authoredByBot) msg.channel.send('Sletter du meldingene mine? 😲');
    });
  }
  setAnnoyingTimers(): void {
    // robin 

    const generalChannel = this.channels.cache.get('472482611084918786')

    // console.log(this.channels.cache.get('472482611084918786'));

    this.guilds;


    // (generalChannel as TextChannel).send('@Vital#2956 you dick')
  }
  
}
