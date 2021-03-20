import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export class WeatherCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'vær', // command name/keyword
      group: 'frisbee', // belongs to which command group
      memberName: 'vær', // command id within its group
      description: 'Lister ut frisbeeværet',
    });
  }

  run(msg: CommandoMessage): Promise<Message> {


    return msg.say(`Hei, ${msg.author} 😄`);
  }
}
