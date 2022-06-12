//require .env file
// require("dotenv").config()

//////////////////////////////////////////////
//setting up express and liquid and all of the variables here
//////////////////////////////////////////////// 
const express = require('express')
const app = require('liquid-express-views')(express())
const PORT = 2022
const dojoRouter = require('./controllers/dojostorm.js')




//////////////////////////////////////////////
// Index Routes
//////////////////////////////////////////////
app.get('/index', (req, res) => {
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
// const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT} @dbic`)
});

