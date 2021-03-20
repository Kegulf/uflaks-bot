import { Message, PartialMessage } from 'discord.js';

export const onMessage = (msg: Message): void => {
  const { content } = msg;

  const isTired = content.toLowerCase().indexOf('trøtt') !== -1;
  const isUflaks = content.toLowerCase().indexOf('uflaks') !== -1;

  if (isTired) msg.channel.send('Ska du ha nokke KAFFI? :coffee:');
  if (isUflaks) msg.channel.send('Ja det vart Uflaks! :panda_face:');
};

export const onMessageDelete = (msg: Message | PartialMessage): void => {
  const authoredByBot = msg.author?.bot;
  if (authoredByBot) msg.channel.send('Sletter du meldingene mine? 😲');
};
