import { Block } from "./../entities/Block";
import { getEmojiLetter, isValidDate } from "../utils";
import type { Command } from "./command";

export const ab: Command = {
  name: "ab",
  description: "Returns whether a given date is an A day, B day, or neither",
  options: [
    {
      name: "month",
      description: "The month to check",
      type: "NUMBER",
      required: true,
    },
    {
      name: "day",
      description: "The month to check",
      type: "NUMBER",
      required: true,
    },
  ],
  execute: async (interaction) => {
    const month = interaction.options.get("month")?.value as number;
    const day = interaction.options.get("day")?.value as number;

    if (!isValidDate(month, day)) {
      interaction.reply(`Invalid date${month === 2 && day === 0 ? " (maybe an issue with leap year)" : ""}`);
      return;
    }

    const block = await Block.findOne({ where: { month, day } });
    if (block) {
      const emoji = getEmojiLetter(block.block);
      interaction.reply(`${month} ${day} is a${block.block === "a" ? "n" : ""} ${emoji} day`);
      return;
    } else {
      interaction.reply("No block found");
      return;
    }
  },
};
