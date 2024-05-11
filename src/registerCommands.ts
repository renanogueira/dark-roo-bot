import { Client, REST, Routes } from "discord.js";
import { CommandInteraction } from "discord.js";
import { config as dotEnvInit } from "dotenv";
import commands from "./slash-commands/commands.json";

dotEnvInit();

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

export async function registerCommands(client: Client): Promise<void> {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!
      ),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { registerCommands };
