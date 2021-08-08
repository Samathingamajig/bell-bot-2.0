import type { Command } from "./command";

export const ping: Command = {
  name: "ping",
  description: 'Replies with "Pong!" along with the delay our backend',
  execute: async (interaction) => {
    const now = Date.now();
    const delay = Math.abs(now - interaction.createdAt.valueOf());
    interaction.reply(`Pong! To BellBot: ${delay}ms`);
  },
};
