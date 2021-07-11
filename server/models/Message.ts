import { Schema, model } from "mongoose";

// схема сообщения

const Message = new Schema({
  avatar: { type: String, required: true },
  nick: { type: String, required: true },
  message: { type: String },
});

export default model("Message", Message);
