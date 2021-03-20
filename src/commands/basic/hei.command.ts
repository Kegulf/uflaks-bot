import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export class HeiCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'hei', // command name/keyword
      group: 'basic', // belongs to which command group
      memberName: 'hei', // command id within its group
      description: 'Svarer "Hei <ditt navn>."',
    });
  }

  run(msg: CommandoMessage): Promise<Message> {
    return msg.say(`Hei, ${msg.author} 😄`);
  }
}
