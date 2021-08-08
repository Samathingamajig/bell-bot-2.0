require("dotenv").config();
import { Client, Intents, TextChannel } from "discord.js";
import { createConnection } from "typeorm";
import { dailyBlockMessage } from "./scripts/dailyBlockMessage";
import * as rawCommands from "./commands";
import { Command } from "./commands/command.d";
const commands: Map<keyof typeof rawCommands, Command> = new Map();
for (const command of Object.values(rawCommands)) {
  commands.set(command.name as keyof typeof rawCommands, command);
}

const guildId = "873704352802541608";
const channelId = "873704352802541611";

const discordBot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

discordBot.on("messageCreate", async (message) => {
  if (!discordBot.application?.owner) await discordBot.application?.fetch();

  if (message.content.toLowerCase() === "!deploy" && message.author.id === discordBot.application?.owner?.id) {
    const guild = discordBot.guilds.cache.get(guildId);
    if (!guild) return;
    for (const command of commands.values()) {
      const response = await guild.commands.create(command);
      console.log(response);
    }
  }
});

discordBot.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName as keyof typeof rawCommands);
  if (command) {
    command.execute(interaction);
  }
});

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();
  console.log("migrations finished");

  await discordBot.login(process.env.DISCORD_TOKEN);
  console.log("Discord bot connected");

  const channel = (await discordBot.channels.fetch(channelId)) as TextChannel | null;
  if (channel == null) {
    console.log("Channel not found");
    discordBot.destroy();
    return;
  }

  const dailyBlockMessageIntervalFunction = dailyBlockMessage(channel);
  setInterval(dailyBlockMessageIntervalFunction, 1000 * 10);
})();
