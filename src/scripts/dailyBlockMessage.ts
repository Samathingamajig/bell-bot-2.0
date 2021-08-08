import { Block } from "./../entities/Block";
import { TextChannel } from "discord.js";
import { getEmojiLetter } from "./../utils/getEmojiLetter";

let mostRecentMessage: {
  day?: number;
  month?: number;
  year?: number;
} = {
  day: undefined,
  month: undefined,
  year: undefined,
};

export const dailyBlockMessage = (channel: TextChannel) => async () => {
  const date = new Date();
  if (!(date.getHours() === 0 && date.getMinutes() === 14)) return;
  if (
    mostRecentMessage.day === date.getDate() &&
    mostRecentMessage.month === date.getMonth() &&
    mostRecentMessage.year === date.getFullYear()
  ) {
    return;
  }

  const block = await Block.findOne({ where: { day: new Date().getDate(), month: new Date().getMonth() + 1 } });
  if (block) {
    const emoji = getEmojiLetter(block.block);
    await channel.send(`Today is a${block.block === "a" ? "n" : ""} ${emoji} day`);
  } else if (date.getDay() !== 0 && date.getDay() !== 6) {
    await channel.send("No school today");
  }
  mostRecentMessage = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};
