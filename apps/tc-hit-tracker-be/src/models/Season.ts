import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
  year: { type: Number, required: true, unique: true },
  league: { type: String, required: true },
  team: { type: String, required: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }],
});

export const Season = mongoose.model('Season', seasonSchema);