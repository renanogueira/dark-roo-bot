import mongoose, { Document, Schema } from "mongoose";

export interface IGuild extends Document {
  guildId: string;
  name: string;
  serverName: string;
  clanLevel: number;
  leaderName: string;
  //TODO: Outros campos conforme necessário
}

const GuildSchema: Schema = new Schema({
  guildId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  serverName: { type: String, required: true },
  clanLevel: { type: Number, default: 1 },
  leaderName: { type: String, required: true },
  //TODO: Outros campos conforme necessário
});

const Guild = mongoose.model<IGuild>("Guild", GuildSchema);

export default Guild;
