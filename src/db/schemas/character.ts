import mongoose, { Document, Schema } from "mongoose";

export interface ICharacter extends Document {
  userId: string;
  characterName: string;
  class: string;
  level: number;
  power: number;
  title: string;
  //TODO: Outros campos conforme necessário
}

const CharacterSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  characterName: { type: String, required: true, unique: true },
  class: {
    type: String,
    enum: ["algoz", "bruxo", "outras classes"],
    required: true,
  },
  level: { type: Number, required: true },
  power: { type: Number, default: 0 },
  title: { type: String, enum: ["lua 5", "sol 1", "outros títulos"] },
  //TODO: Outros campos conforme necessário
});

const Character = mongoose.model<ICharacter>("Character", CharacterSchema);

export default Character;
