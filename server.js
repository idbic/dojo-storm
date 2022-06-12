//require .env file
// require("dotenv").config()
// setting up express and liquid and all of the variables here
const express = require('express')
const app = require('liquid-express-views')(express())
const PORT = 2022

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
// const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT} @dbic`));

