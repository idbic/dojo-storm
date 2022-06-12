//require .env file ran "npm i dotenv --save"
require("dotenv").config()

//////////////////////////////////////////////
//setting up express and liquid and all of the variables here
//////////////////////////////////////////////// 
const express = require('express')
const path = require('path')
const app = require('liquid-express-views')(express(), {root: [path.resolve(__dirname, 'views/')]})
const mongoose = require('mongoose')
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const MongoStore = require('connect-mongo')
const PORT = 2022
const dojoRouter = require('./controllers/dojostorm.js')
// const PORT = process.env.PORT;
/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically


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
    res.render('login')
})

app.get('/home', (req, res) => {
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

app.listen(PORT, () => console.log(`Now Listening on port ${PORT} @dbic`));

