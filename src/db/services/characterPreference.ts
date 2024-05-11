import CharacterPreference, { ICharacterPreference } from '../schemas/characterPreference';
import { Document } from 'mongoose';

interface ICharacterPreferenceService {
    createCharacterPreference(preferenceData: ICharacterPreference): Promise<Document<ICharacterPreference>>;
    getPreferenceByCharacterId(characterId: string): Promise<Document<ICharacterPreference> | null>;
    updatePreference(characterId: string, newData: Partial<ICharacterPreference>): Promise<Document<ICharacterPreference> | null>;
    deletePreferenceByCharacterId(characterId: string): Promise<Document<ICharacterPreference> | null>;
}

const CharacterPreferenceService: ICharacterPreferenceService = {
    async createCharacterPreference(preferenceData: ICharacterPreference): Promise<Document<ICharacterPreference>> {
        try {
            const preference = new CharacterPreference(preferenceData);
            await preference.save();
            return preference;
        } catch (error) {
            throw new Error('Error creating character preference');
        }
    },

    async getPreferenceByCharacterId(characterId: string): Promise<Document<ICharacterPreference> | null> {
        try {
            const preference = await CharacterPreference.findOne({ characterId });
            return preference;
        } catch (error) {
            throw new Error('Error getting character preference by ID');
        }
    },

    async updatePreference(characterId: string, newData: Partial<ICharacterPreference>): Promise<Document<ICharacterPreference> | null> {
        try {
            const preference = await CharacterPreference.findOneAndUpdate({ characterId }, newData, { new: true });
            return preference;
        } catch (error) {
            throw new Error('Error updating character preference');
        }
    },

    async deletePreferenceByCharacterId(characterId: string): Promise<Document<ICharacterPreference> | null> {
        try {
            const preference = await CharacterPreference.findOneAndDelete({ characterId });
            return preference;
        } catch (error) {
            throw new Error('Error deleting character preference by ID');
        }
    },
};

export default CharacterPreferenceService;

