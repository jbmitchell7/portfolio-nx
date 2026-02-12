import mongoose from "mongoose";
import { atBatSchema } from "./AtBat";

const gameSchema = new mongoose.Schema({
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
  atBats: [atBatSchema], 
});

export { gameSchema };
