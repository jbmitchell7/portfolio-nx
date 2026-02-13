import mongoose from "mongoose";

const opponentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: false,
  },
  inConference: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export { opponentSchema };