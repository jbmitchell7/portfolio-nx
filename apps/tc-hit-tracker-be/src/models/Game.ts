import mongoose from "mongoose";

enum Location {
  HOME = 'HOME',
  AWAY = 'AWAY'
}

const gameSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  gameNumber: { type: Number, required: true },
  location: {type: Location, required: true},
  atBats: [{type: mongoose.Schema.Types.ObjectId, ref: 'AtBat', required: true}], 
});

export const Game = mongoose.model('Game', gameSchema);