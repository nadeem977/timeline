const mongoose = require("mongoose")

const staySchema = new mongoose.Schema({
    name: String,
    address: String,
    img: String,  
    timeS: String,
    timeE: String,
    start: String,
    date: String,
    category: String,
    minutes:String
  });
  const doSchema = new mongoose.Schema({
    name: String,
    address: String,
    img: String,  
    timeS: String,
    timeE: String,
    start: String,
    date: String,
    category: String,
    minutes:String
  });

  const eatSchema = new mongoose.Schema({
    name: String,
    address: String,
    img: String,  
    timeS: String,
    timeE: String,
    start: String,
    date: String,
    category: String,
    minutes:String
  });

  const otherSchema = new mongoose.Schema({
    name: String,
    address: String,
    img: String,  
    timeS: String,
    timeE: String,
    start: String,
    date: String,
    category: String,
    minutes:String
  });

const SchmeAuth = mongoose.Schema({
 
    time:{
        type:String
    },
    stay:[staySchema],
    do:[doSchema],
    eat:[eatSchema],
    other:[otherSchema] 
},{timestamps:true})

const Schedule = mongoose.model("Schedule",SchmeAuth)

module.exports = Schedule ;