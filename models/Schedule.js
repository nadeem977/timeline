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
});

const SchmeAuth = new mongoose.Schema(
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


const CreatePlan = mongoose.Schema({
  title: String,
  plan:[SchmeAuth]
})

const Schedule = mongoose.model("Schedule", CreatePlan);

module.exports = Schedule;
