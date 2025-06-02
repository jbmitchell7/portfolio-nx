import mongoose from 'mongoose';

enum PitcherArm {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

enum LaunchType {
  LINE_DRIVE = 'LINE_DRIVE',
  GROUND_BALL = 'GROUND_BALL',
  FLY_BALL = 'FLY_BALL',
  BUNT = 'BUNT',
}

enum Contact {
  HARD = 'HARD',
  SOFT = 'SOFT',
  MEDIUM = 'MEDIUM',
}

enum PitchType {
  FASTBALL = 'FASTBALL',
  CURVEBALL = 'CURVEBALL',
  SLIDER = 'SLIDER',
  CHANGEUP = 'CHANGEUP',
  KNUCKLEBALL = 'KNUCKLEBALL',
  SPLITTER = 'SPLITTER',
  OTHER = 'OTHER',
}

const atBatSchema = new mongoose.Schema({
  gamePANumber: {
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
  pitchType: {
    type: PitchType,
    required: true,
    uppercase: true,
    default: PitchType.FASTBALL
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
    type: PitcherArm,
    required: true,
    uppercase: true,
    default: PitcherArm.RIGHT,
  },
  launchType: {
    type: LaunchType,
    required: false,
    uppercase: true,
  },
  contact: {
    type: Contact,
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
  runsBattedIn: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 4,
  },
});

export const AtBat = mongoose.model('AtBat', atBatSchema);
