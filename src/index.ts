import {
  CacheType,
  Client,
  CommandInteraction,
  Events,
  GatewayIntentBits,
  Interaction,
  Message,
} from "discord.js";
import { registerCommands } from "./registerCommands";
import { handleSlashCommands } from "./slash-commands";
import { handleInteractionCreate } from "./events/interactionCreate";
import { config as dotEnvInit } from "dotenv";
import { db } from "./db";

dotEnvInit();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`Bot online! Logado como ${client.user?.tag}`);
  registerCommands(client);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  handleInteractionCreate(interaction);
});

client.login(process.env.DISCORD_TOKEN);
