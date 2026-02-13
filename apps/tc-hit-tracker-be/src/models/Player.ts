import mongoose from "mongoose";
import { seasonSchema } from "./Season";

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  birthdate: {
    type: String,
    required: false,
  },
  handedness: {
    type: String,
    enum: ['LEFT', 'RIGHT', 'SWITCH'],
    required: true,
  },
  seasons: {
    type: Map,
    of: seasonSchema,
    required: false,
  },
});

export const Player = mongoose.model('Player', playerSchema);
