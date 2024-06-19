import express from "express";
import { userController } from "./controller.js";
const userRouter = express.Router();

userRouter.get("/get-all", userController.getAllUsers);

export default userRouter;
