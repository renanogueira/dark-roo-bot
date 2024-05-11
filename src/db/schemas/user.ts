import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  discordId: string;
  guildId: string;
  characterId: string;
  //TODO: Outros campos conforme necessário
}

const UserSchema: Schema = new Schema({
  discordId: { type: String, required: true, unique: true },
  guildId: { type: String, required: true },
  characterId: { type: String, unique: true },
  //TODO: Outros campos conforme necessário
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
