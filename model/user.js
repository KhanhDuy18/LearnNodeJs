import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

const UserModel = mongoose.model("user", userSchema);

export { UserModel };
