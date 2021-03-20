import dotenv from 'dotenv';
import { UlfaksbotClient } from './client/uflaks-bot.client';
import { scheduleAllJobs } from './data';

// We use dotenv to initialize local envs for development (see untracked file: .env)
dotenv.config();
// We fetch the environment variables we need
const { BOT_OWNER, BOT_TOKEN, CMD_PREFIX } = process.env;


// We initialize the CommandoClient from discord.js-commando
// The client structure contains everything we need to interact fluently with the Discord API
const client = new UlfaksbotClient({
  owner: BOT_OWNER,
  commandPrefix: CMD_PREFIX || '!',
});


/**
 * Login to the Discord service
 * @ignore
 */
client.login(BOT_TOKEN);


/**
 * Schedule routine jobs
 * @ignore
 */
scheduleAllJobs();
