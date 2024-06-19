import { UserModel } from "../../model/user.js";

export const userService = {
  getAllUser: async () => {
    try {
      const users = await UserModel.find();
      return users;
    } catch (e) {
      console.error(e);
    }
  },
};
