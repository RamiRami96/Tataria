import { Schema, model } from "mongoose";

const Message = new Schema({
  avatar: { type: String, required: true },
  nick: { type: String, required: true },
  message: { type: String },
});

export default model("Message", Message);
