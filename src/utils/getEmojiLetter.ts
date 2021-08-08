export const getEmojiLetter = (letter: string): ":a:" | ":b:" | `:regional_indicator_${string}:` => {
  if (letter === "a") return ":a:";
  else if (letter === "b") return ":b:";
  else return `:regional_indicator_${letter}:`;
};
