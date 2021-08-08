import { Block } from "./../entities/Block";
import type { Command } from "./command";
import { getConnection } from "typeorm";

export const del: Command = {
  name: "del",
  description: "Deletes a given date from the database",
  options: [
    {
      name: "month",
      description: "The month to delete",
      type: "NUMBER",
      required: true,
    },
    {
      name: "day",
      description: "The month to delete",
      type: "NUMBER",
      required: true,
    },
  ],
  execute: async (interaction) => {
    const month = interaction.options.get("month")?.value as number;
    const day = interaction.options.get("day")?.value as number;

    try {
      const deletion = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Block)
        .where({ month, day })
        .returning("*")
        .execute();
      if (deletion.raw.length === 0) {
        interaction.reply("No block found");
        return;
      } else {
        interaction.reply(`${month} ${day} deleted!`);
        return;
      }
    } catch (e) {
      interaction.reply("Error deleting");
      console.log(e);
    }
  },
};
