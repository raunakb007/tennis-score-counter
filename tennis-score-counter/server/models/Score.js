const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player1: {
      gameScore:{
          type: Schema.Types.Mixed,
          required: true
      },
      setScore: {
        type: Schema.Types.Mixed,
        required: true
      },
      matchScore: {
        type: Schema.Types.Mixed,
        required: true
      }
  },
  player2: {
    gameScore:{
        type: Schema.Types.Mixed,
        required: true
    },
    setScore: {
      type: Schema.Types.Mixed,
      required: true
    },
    matchScore: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  gameNumber: {
    type: Number,
    required: true
  },
  setNumber: {
    type: Number,
    required: true
  },
});

module.exports = Score = mongoose.model("Scores", ScoreSchema);