const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  player_id: { type: String, required: true },
  team: { type: String, required: true },
  sport: { type: String, required: true },
  first_name: { type: Number, required: true },
  last_name: { type: Number, required: true },
  position: { type: String, required: true },
  fantasy_positions: { type: [String], required: true },
  injury_status: { type: String, required: true },
  active: { type: Boolean, required: true },
  full_name: { type: String, required: false },
  weight: { type: String, required: false },
  height: { type: String, required: false },
  birth_date: { type: String, required: false },
  college: { type: String, required: false },
  status: { type: String, required: false },
  depth_chart_order: { type: {}, required: false},
  years_exp: { type: {}, required: false},
});

const lcsSchema = new mongoose.Schema(
  {...playerSchema.obj},
  {collection: 'lcs'}
);
const nbaSchema = new mongoose.Schema(
  {...playerSchema.obj},
  {collection: 'nba'}
);
const nflSchema = new mongoose.Schema(
  {...playerSchema.obj},
  {collection: 'nfl'}
);

const lcsPlayer = mongoose.model('lcs', lcsSchema);
const nbaPlayer = mongoose.model('nba', nbaSchema);
const nflPlayer = mongoose.model('nfl', nflSchema);

module.exports.LCSPlayer = lcsPlayer;
module.exports.NBAPlayer = nbaPlayer;
module.exports.NFLPlayer = nflPlayer;
