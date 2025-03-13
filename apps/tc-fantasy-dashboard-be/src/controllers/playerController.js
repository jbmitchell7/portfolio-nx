const express = require('express');
const router = express.Router();
const Models = require('../models/Player');

const LCSPlayer = Models.LCSPlayer;
const NBAPlayer = Models.NBAPlayer;
const NFLPlayer = Models.NFLPlayer;

const getModel = (req) => {
  let model = LCSPlayer;
  if (req.params.sport === 'nba') {
    model = NBAPlayer;
  }
  if (req.params.sport === 'nfl') {
    model = NFLPlayer;
  }
  return model
}

// Get a single player
router.get('/:sport/:id', async (req, res) => {
  try {
    const model = getModel(req);
    const player = await model.findOne({player_id: req.params.id.toString()});
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get list of players
router.post('/:sport', async (req, res) => {
  try {
    const model = getModel(req);
    const players = await model.find({player_id: { $in : req.body.players}});
    if (!players?.length) {
      return res.status(404).json({ error: 'Players not found' });
    }
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;