import Guild, { IGuild } from "../schemas/guild";
import { Document } from "mongoose";

interface IGuildService {
  createGuild(guildData: IGuild): Promise<Document<IGuild>>;
  getGuildById(guildId: string): Promise<Document<IGuild> | null>;
  updateGuild(
    guildId: string,
    newData: Partial<IGuild>
  ): Promise<Document<IGuild> | null>;
  deleteGuildById(guildId: string): Promise<Document<IGuild> | null>;
}

const GuildService: IGuildService = {
  async createGuild(guildData: IGuild): Promise<Document<IGuild>> {
    try {
      const guild = new Guild(guildData);
      await guild.save();
      return guild;
    } catch (error) {
      throw new Error("Error creating guild");
    }
  },

  async getGuildById(guildId: string): Promise<Document<IGuild> | null> {
    try {
      const guild = await Guild.findOne({ guildId });
      return guild;
    } catch (error) {
      throw new Error("Error getting guild by ID");
    }
  },

  async updateGuild(
    guildId: string,
    newData: Partial<IGuild>
  ): Promise<Document<IGuild> | null> {
    try {
      const guild = await Guild.findOneAndUpdate({ guildId }, newData, {
        new: true,
      });
      return guild;
    } catch (error) {
      throw new Error("Error updating guild");
    }
  },

  async deleteGuildById(guildId: string): Promise<Document<IGuild> | null> {
    try {
      const guild = await Guild.findOneAndDelete({ guildId });
      return guild;
    } catch (error) {
      throw new Error("Error deleting guild by ID");
    }
  },
};

export default GuildService;
