import mongoose from 'mongoose';

enum PitcherArm {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
};

enum LaunchType {
  LINE_DRIVE = 'LINE_DRIVE',
  GROUND_BALL = 'GROUND_BALL',
  FLY_BALL = 'FLY_BALL',
  BUNT = 'BUNT'
};

enum Contact {
  HARD = 'HARD',
  SOFT = 'SOFT',
  MEDIUM = 'MEDIUM'
}

const atBatSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  gamePANumber: {type: Number, required: true},
  result: {type: String, required: true},
  numberOfPitches: {type: Number, required: true},
  pitchType: {type: String, required: true},
  runners: {
    first: {type: Boolean, required: true},
    second: {type: Boolean, required: true},
    third: {type: Boolean, required: true}
  },
  pitcherArm: {type: PitcherArm, required: true},
  launchType: {type: LaunchType, required: false},
  contact: {type: Contact, required: false},
  doublePlay: {type: Boolean, required: false},
  sacrifice: {type: Boolean, required: false},
  runsBattedIn: {type: Number, required: false},
});

export const AtBat = mongoose.model('AtBat', atBatSchema);
