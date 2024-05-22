const mongoose = require("mongoose");

const staySchema = new mongoose.Schema({
  name: String,
  address: String,
  img: String,
  timeS: String,
  timeE: String,
  start: String,
  startDate: String,
  lastDate: String,
  category: String,
  minutes: String,
  height: {
    type: Number,
    default: 45,
    max: [1035, "Height cannot be more than 1035"],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  expired: {
    type: Boolean,
    default: false,
  },
});
const doSchema = new mongoose.Schema({
  name: String,
  address: String,
  img: String,
  timeS: String,
  timeE: String,
  start: String,
  startDate: String,
  lastDate: String,
  category: String,
  minutes: String,
  height: {
    type: Number,
    default: 45,
    max: [1035, "Height cannot be more than 1035"],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  expired: {
    type: Boolean,
    default: false,
  },
});
  
const eatSchema = new mongoose.Schema({
  name: String,
  address: String,
  img: String,
  timeS: String,
  timeE: String,
  start: String,
  startDate: String,
  lastDate: String,
  category: String,
  minutes: String,
  height: {
    type: Number,
    default: 45,
    max: [1035, "Height cannot be more than 1035"],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  expired: {
    type: Boolean,
    default: false,
  },
});

const otherSchema = new mongoose.Schema({
  name: String,
  address: String,
  img: String,
  timeS: String,
  timeE: String,
  start: String,
  startDate: String,
  lastDate: String,
  category: String,
  minutes: String,
  height: {
    type: Number,
    default: 45,
    max: [1035, "Height cannot be more than 1035"],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  expired: {
    type: Boolean,
    default: false,
  },
});

const SchmeAuth = mongoose.Schema(
  {
    time: {
      type: String,
    },
    stay: [staySchema],
    do: [doSchema],
    eat: [eatSchema],
    other: [otherSchema],
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", SchmeAuth);

module.exports = Schedule;
