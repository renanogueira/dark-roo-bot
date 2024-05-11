import { CommandInteraction } from 'discord.js';
import { createEvent } from './create-event';

export const handleSlashCommands = async (interaction: CommandInteraction): Promise<void> => {
  if (!interaction.isCommand()) return;

  const command = interaction.commandName;

  switch (command) {
    case 'create-event':
      return createEvent.run(interaction);
    default:
      // Handle other commands
      return;
  }
};