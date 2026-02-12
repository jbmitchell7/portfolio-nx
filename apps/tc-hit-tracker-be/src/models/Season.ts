import mongoose from "mongoose";
import { gameSchema } from "./Game";

const seasonSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    min: 1900,
  },
  league: {
    type: String,
    required: true
  },
  team: { 
    type: String,
    required: true
  },
  games: [gameSchema],
});

export { seasonSchema };
