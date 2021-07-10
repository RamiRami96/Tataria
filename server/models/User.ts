import { Schema, model, Types } from "mongoose";

const User = new Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "defaultAvatar.png",
  },
  tracks: [{ type: Types.ObjectId, ref: "File" }],
});

export default model("User", User);
