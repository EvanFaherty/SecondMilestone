const mongoose = require("mongoose")

const PlayerSchema = mongoose.Schema(
    {
    name: {type: String},
    dob: {type: String},
    goals: {type: int},
    imageurl: {type: String},
    }
  )
  
  let Player = mongoose.model('Player', PlayerSchema);
  module.exports = Player