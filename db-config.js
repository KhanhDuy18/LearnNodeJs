import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const database = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connect Database Successfully");
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  },
};
