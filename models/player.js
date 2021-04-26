const mongoose = require("mongoose")

const PlayerSchema = mongoose.Schema(
    {
    name: {type: String},
    dob: {type: String},
    imageurl: {type: String},
    }
  )

  // Note for the moment we are storing the date as a string
  // rather than a date.
  // https://www.compose.com/articles/understanding-dates-in-compose-mongodb/
  
  let Player = mongoose.model('Player', PlayerSchema);

  module.exports = Player