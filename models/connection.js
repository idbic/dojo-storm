/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config()
const mongoose = require('mongoose')

/////////////////////////////////////////////
// Databases connection and setup inputs for connect function
/////////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

////////////////////////////////////////////////
// Establish connection
/////////////////////////////////////////////

mongoose.connect(DATABASE_URL, CONFIG)

//////////////////////////////////////////////
// console logs for events of the server
//////////////////////////////////////////////

mongoose.connection
.on("open", () => console.log("Connected to Mongoose RAWRRR!"))
.on("close", () => console.log("Disconnected from Mongoose. Later Holmes!"))
.on("error", (error) => console.log(error));

//////////////////////////////////////////////
// export connection
//////////////////////////////////////////////

module.exports = mongoose 
