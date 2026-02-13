import mongoose from 'mongoose';

const atBatSchema = new mongoose.Schema({
  plateAppearance: {
    type: Number,
    required: true,
    min: 1,
  },
  result: {
    type: String,
    required: true,
  },
  numberOfPitches: {
    type: Number,
    required: true,
    min: 1,
  },
  finalPitchType: {
    type: String,
    enum: ['FASTBALL', 'CURVEBALL', 'SLIDER', 'CHANGEUP', 'KNUCKLEBALL', 'SPLITTER', 'OTHER'],
    required: true,
    uppercase: true,
    default: 'FASTBALL'
  },
  runners: {
    first: {
      type: Boolean,
      required: true,
      default: false,
    },
    second: {
      type: Boolean,
      required: true,
      default: false,
    },
    third: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  pitcherArm: {
    type: String,
    enum: ['LEFT', 'RIGHT'],
    required: true,
    uppercase: true,
    default: 'RIGHT',
  },
  launchType: {
    type: String,
    enum: ['LINE_DRIVE', 'GROUND_BALL', 'FLY_BALL', 'BUNT'],
    required: false,
    uppercase: true,
  },
  contact: {
    type: String,
    enum: ['HARD', 'SOFT', 'MEDIUM'],
    required: false,
    uppercase: true,
  },
  doublePlay: {
    type: Boolean,
    required: false,
    default: false,
  },
  sacrifice: {
    type: Boolean,
    required: false,
    default: false,
  },
  walk: {
    type: Boolean,
    required: false,
    default: false,
  },
  strikeout: {
    type: Boolean,
    required: false,
    default: false,
  },
  hit: {
    type: Boolean,
    required: false,
    default: false,
  },
  runsBattedIn: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 4,
  },
});

export { atBatSchema };
