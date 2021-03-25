import { User } from 'discord.js';
import { CommandoClient, CommandoClientOptions } from 'discord.js-commando';

import { commandGroups } from '../commands/commandGroups';
import { onMessage, onMessageDelete } from '../events';
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

    this.on('message', (msg) => onMessage(msg, this.isAuthorMe(msg.author)));
    this.on('messageDelete', onMessageDelete);
  }
  setAnnoyingTimers(): void {
    // robin
    const generalChannel = this.channels.cache.get('472482611084918786');
    // console.log(this.channels.cache.get('472482611084918786'));
    // (generalChannel as TextChannel).send('@Vital#2956 you dick')
  }

  isAuthorMe(author: User | null): boolean {
    return author?.id === this.user?.id;
  }
}
