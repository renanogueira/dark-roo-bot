import mongoose, { Connection, ConnectOptions } from "mongoose";
import { config as dotEnvInit } from "dotenv";

import {
  CharacterService,
  CharacterPreferenceService,
  GuildService,
  UserService,
} from "./services";

dotEnvInit();

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

console.log('Inicializando MongoDB Atlas');
mongoose.connect(process.env.MONGODB_URI as string, clientOptions);

const db: Connection = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão com o MongoDB Atlas:"));
db.once("open", () => {
  console.log("Conexão com o MongoDB Atlas estabelecida com sucesso.");
});

export const services = {
  CharacterService,
  CharacterPreferenceService,
  GuildService,
  UserService,
};
export { db };
