import mongoose from "mongoose";
import { seasonSchema } from "./Season";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  handedness: {
    type: String,
    enum: ['LEFT', 'RIGHT', 'SWITCH'],
    required: true,
  },
  seasons: [seasonSchema],
});

export const Player = mongoose.model('Player', playerSchema);
