import { Schema, model } from "mongoose";

const Track = new Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  poster: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  audio: { type: String, default: "" },
  likes: [{ type: Object }],
  date: { type: Date, default: new Date() },
});

export default model("Track", Track);
