import mongoose from "mongoose";
import { atBatSchema } from "./AtBat";
import { opponentSchema } from "./Opponent";

const gameSchema = new mongoose.Schema({
  isPlayoff: {
    type: Boolean,
    required: true,
    default: false,
  },
  gameNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  location: {
    type: String,
    enum: ['HOME', 'AWAY'],
    required: true
  },
  opponent: opponentSchema,
  atBats: [atBatSchema], 
});

export { gameSchema };
