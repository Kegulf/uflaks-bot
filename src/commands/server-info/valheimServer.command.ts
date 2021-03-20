import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export class ValheimCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'valheim', // command name/keyword
      group: 'server-info', // belongs to which command group
      memberName: 'valheim', // command id within its group
      description: 'Forteller deg IP og passord til Valheim-serveren "Uflaks".',
    });
  }

  run(msg: CommandoMessage): Promise<Message> {
    const { VALHEIM_SERVER_IP, VALHEIM_SERVER_PW } = process.env;
    return msg.author.send(`
      \`\`\`
IP: ${VALHEIM_SERVER_IP}
PW: ${VALHEIM_SERVER_PW}
\`\`\`
    `);
  }
}
