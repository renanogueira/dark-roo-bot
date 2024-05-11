import User, { IUser } from "../schemas/user";
import { Document } from "mongoose";

interface IUserService {
  createUser(userData: IUser): Promise<Document<IUser>>;
  getUserByDiscordId(discordId: string): Promise<Document<IUser> | null>;
  updateUser(
    discordId: string,
    newData: Partial<IUser>
  ): Promise<Document<IUser> | null>;
  deleteUserByDiscordId(discordId: string): Promise<Document<IUser> | null>;
}

const UserService: IUserService = {
  async createUser(userData: IUser): Promise<Document<IUser>> {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error creating user");
    }
  },

  async getUserByDiscordId(discordId: string): Promise<Document<IUser> | null> {
    try {
      const user = await User.findOne({ discordId });
      return user;
    } catch (error) {
      throw new Error("Error getting user by Discord ID");
    }
  },

  async updateUser(
    discordId: string,
    newData: Partial<IUser>
  ): Promise<Document<IUser> | null> {
    try {
      const user = await User.findOneAndUpdate({ discordId }, newData, {
        new: true,
      });
      return user;
    } catch (error) {
      throw new Error("Error updating user");
    }
  },

  async deleteUserByDiscordId(
    discordId: string
  ): Promise<Document<IUser> | null> {
    try {
      const user = await User.findOneAndDelete({ discordId });
      return user;
    } catch (error) {
      throw new Error("Error deleting user by Discord ID");
    }
  },
};

export default UserService;
