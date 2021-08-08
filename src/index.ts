require("dotenv").config();
import { Client, Intents } from "discord.js";
import { createConnection, getConnection } from "typeorm";
import { Block } from "./entities/Block";
import { isValidDate } from "./utils/isValidDate";

const discordBot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

discordBot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.cleanContent.startsWith("!")) return;
  const command = message.cleanContent.split(" ")[0].substring(1);
  const args = message.cleanContent.split(" ").slice(1);

  if (command === "ab") {
    if (args.length !== 2) {
      message.channel.send("Invalid number of arguments (expected 2)");
      return;
    }
    const month = parseInt(args[0]);
    const day = parseInt(args[1]);

    if (isNaN(month) || isNaN(day)) {
      message.channel.send("Invalid arguments (expected numbers)");
      return;
    }

    if (!isValidDate(month, day)) {
      message.channel.send(`Invalid date${month === 2 && day === 0 ? " (maybe an issue with leap year)" : ""}`);
      return;
    }

    const block = await Block.findOne({ where: { month, day } });
    if (block) {
      message.channel.send(`${block.block}`);
      return;
    } else {
      message.channel.send("No block found");
      return;
    }
  } else if (command === "set") {
    if (args.length !== 3) {
      message.channel.send("Invalid number of arguments (expected 3)");
      return;
    }
    const month = parseInt(args[0]);
    const day = parseInt(args[1]);
    const block = args[2];
    if (isNaN(month) || isNaN(day) || block.length !== 1) {
      message.channel.send("Invalid arguments (expected 2 numbers, and 1 char)");
      return;
    }
    const blockExists = await Block.findOne({ where: { month, day } });
    if (blockExists) {
      blockExists.block = block;
      await blockExists.save();
    } else {
      const newBlock = Block.create({ month, day, block, year: new Date().getFullYear() });
      await newBlock.save();
    }

    message.channel.send(`${month} ${day} set to ${block}`);
  } else if (command === "del") {
    if (args.length !== 2) {
      message.channel.send("Invalid number of arguments (expected 2)");
      return;
    }
    const month = parseInt(args[0]);
    const day = parseInt(args[1]);
    if (isNaN(month) || isNaN(day)) {
      message.channel.send("Invalid arguments (expected numbers)");
      return;
    }
    try {
      const deletion = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Block)
        .where({ month, day })
        .returning("*")
        .execute();
      if (deletion.raw.length === 0) {
        message.channel.send("No block found");
        return;
      } else {
        message.channel.send(`${month} ${day} deleted!`);
        return;
      }
    } catch (e) {
      message.channel.send("Error deleting");
      console.log(e);
    }
  }
});

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();
  console.log("migrations finished");

  await discordBot.login(process.env.DISCORD_TOKEN);
  console.log("Discord bot connected");
})();
