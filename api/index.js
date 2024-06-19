import express from "express";
const indexRouter = express.Router();

import userRouter from "./user/index.js";

indexRouter.get("", async (req, res) => {
  res.send("Hello word!");
});

indexRouter.use("/user", userRouter);

export default indexRouter;
