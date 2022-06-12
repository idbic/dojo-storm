//require .env file ran "npm i dotenv --save"
require("dotenv").config()

//////////////////////////////////////////////
//setting up express and liquid and all of the variables here
//////////////////////////////////////////////// 
const express = require('express')
const app = require('liquid-express-views')(express())
const session = require('express-session')
//npm i connect-mongo for below
const MongoStore = require('connect-mongo')

// const PORT = 2022
const dojoRouter = require('./controllers/dojostorm.js')
const PORT = process.env.PORT;
//////////////////////////////////////////////
// middleware to setup session
//////////////////////////////////////////////

app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );

//////////////////////////////////////////////
// Index Routes
//////////////////////////////////////////////
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/schedule', (req, res) => {
    res.render('schedule')
})

app.get('/notes', (req, res) => {
    res.render('notes')
})

app.get('/dojoLounge', (req, res) => {
    res.render('dojoLounge')
})

app.get('/store', (req, res) => {
    res.render('store')
})

app.get('/profile', (req, res) => {
    res.render('myprofile')
})
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT} @dbic`)
});

