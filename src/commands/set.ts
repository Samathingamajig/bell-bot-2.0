import { Block } from "./../entities/Block";
import { getEmojiLetter, isValidDate } from "../utils";
import type { Command } from "./command";

export const set: Command = {
  name: "set",
  description: "Sets a given date to a new block day",
  options: [
    {
      name: "month",
      description: "The month to set",
      type: "NUMBER",
      required: true,
    },
    {
      name: "day",
      description: "The month to set",
      type: "NUMBER",
      required: true,
    },
    {
      name: "block",
      description: "The block value (a or b)",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (interaction) => {
    const month = interaction.options.get("month")?.value as number;
    const day = interaction.options.get("day")?.value as number;
    const blockDay = interaction.options.get("block")?.value as string;

    if (!isValidDate(month, day)) {
      interaction.reply(`Invalid date${month === 2 && day === 0 ? " (maybe an issue with leap year)" : ""}`);
      return;
    }

    const blockExists = await Block.findOne({ where: { month, day } });
    if (blockExists) {
      blockExists.block = blockDay;
      await blockExists.save();
    } else {
      const newBlock = Block.create({ month, day, block: blockDay, year: new Date().getFullYear() });
      await newBlock.save();
    }

    interaction.reply(`${month} ${day} set to ${getEmojiLetter(blockDay)}`);
  },
};
