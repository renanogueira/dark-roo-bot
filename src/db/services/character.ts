import Character, { ICharacter } from "../schemas/character";
import { Document } from "mongoose";

interface ICharacterService {
  createCharacter(characterData: ICharacter): Promise<Document<ICharacter>>;
  getCharacterByUserId(userId: string): Promise<Document<ICharacter> | null>;
  updateCharacter(
    userId: string,
    newData: Partial<ICharacter>
  ): Promise<Document<ICharacter> | null>;
  deleteCharacterByUserId(userId: string): Promise<Document<ICharacter> | null>;
}

const CharacterService: ICharacterService = {
  async createCharacter(
    characterData: ICharacter
  ): Promise<Document<ICharacter>> {
    try {
      const character = new Character(characterData);
      await character.save();
      return character;
    } catch (error) {
      throw new Error("Error creating character");
    }
  },

  async getCharacterByUserId(
    userId: string
  ): Promise<Document<ICharacter> | null> {
    try {
      const character = await Character.findOne({ userId });
      return character;
    } catch (error) {
      throw new Error("Error getting character by user ID");
    }
  },

  async updateCharacter(
    userId: string,
    newData: Partial<ICharacter>
  ): Promise<Document<ICharacter> | null> {
    try {
      const character = await Character.findOneAndUpdate({ userId }, newData, {
        new: true,
      });
      return character;
    } catch (error) {
      throw new Error("Error updating character");
    }
  },

  async deleteCharacterByUserId(
    userId: string
  ): Promise<Document<ICharacter> | null> {
    try {
      const character = await Character.findOneAndDelete({ userId });
      return character;
    } catch (error) {
      throw new Error("Error deleting character by user ID");
    }
  },
};

export default CharacterService;
