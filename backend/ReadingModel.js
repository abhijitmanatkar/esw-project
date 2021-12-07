const mongoose = require("mongoose");

const ReadingSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  bp: {
    sys: {
      type: Number,
      required: true,
    },
    dia: {
      type: Number,
      required: true,
    },
  },
  pulse: {
    type: Number,
    required: true,
  },
  spo2: {
    type: Number,
    required: true,
  },
  conductance: {
    type: Number,
    required: true,
  },
});

module.exports = Reading = mongoose.model("Reading", ReadingSchema);
