import { CacheType, CommandInteraction, Interaction } from "discord.js";
import { createEvent } from "../slash-commands/create-event";

export const handleInteractionCreate = async (
  interaction: Interaction<CacheType>
): Promise<void> => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "create-event") {
    createEvent.run(interaction);
  } else {
    // Handle other commands here
  }
};
