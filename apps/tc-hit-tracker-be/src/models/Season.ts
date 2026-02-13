import mongoose from "mongoose";
import { gameSchema } from "./Game";

const seasonSchema = new mongoose.Schema({
  league: {
    type: String,
    required: true
  },
  team: { 
    type: String,
    required: true
  },
  class: {
    type: String,
    required: false
  },
  games: [gameSchema],
});

export { seasonSchema };
