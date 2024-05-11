import mongoose, { Document, Schema } from "mongoose";

export interface ICharacterPreference extends Document {
  characterId: string;
  role: string;
  mapPreference: string;
  isLeader: boolean;
  //TODO: Outros campos conforme necessário
}

const CharacterPreferenceSchema: Schema = new Schema({
  characterId: { type: String, required: true },
  role: {
    type: String,
    enum: ["DPS", "Tank", "Full Support", "Controle"],
    required: true,
  },
  mapPreference: {
    type: String,
    enum: ["Principal", "Secundário", "Sem preferência"],
    required: true,
  },
  isLeader: {
    type: String,
    enum: ["Sim", "Não", "Sem preferência"],
    default: "Sem preferência",
  },
  //TODO: Outros campos conforme necessário
});

const CharacterPreference = mongoose.model<ICharacterPreference>(
  "CharacterPreference",
  CharacterPreferenceSchema
);

export default CharacterPreference;
