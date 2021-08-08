import { ApplicationCommandData, CommandInteraction, Interaction } from "discord.js";

export interface Command extends ApplicationCommandData {
  execute(interaction: CommandInteraction): Promise<void>;
}
