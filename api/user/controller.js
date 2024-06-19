import { userService } from "./service.js";

export const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUser();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  },
};
