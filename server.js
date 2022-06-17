//require .env file ran "npm i dotenv --save"
require("dotenv").config()

//////////////////////////////////////////////
//setting up express and liquid and all of the variables here
//////////////////////////////////////////////// 
const express = require('express')
const path = require('path')
const app = require('liquid-express-views')(express(), {root: [path.resolve(__dirname, 'views/')]})
const mongoose = require('./models/connection')
const mongoURI = 'mongodb://localhost/notes'
// const db = mongoose.connection
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const MongoStore = require('connect-mongo')
const { ObjectId } = require("mongodb")
const PORT = process.env.PORT

const ytVids = []




/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

app.use(express.json()) // This prepares our api to receive json data from the body of all incoming requests.

app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);
const noteRouter = require('./controllers/notes')
const UserRouter = require("./controllers/users")
const Note = require('./models/notes')
const Product = require('./models/products')
const ProductRouter = require('./controllers/products')
const { time } = require("console")
const { datalabeling } = require("googleapis/build/src/apis/datalabeling")
app.use("/notes/", noteRouter)
app.use('/users', UserRouter)
app.use('/store', ProductRouter)
app.use(express.urlencoded({
  extended: false
})) // allows us to view body of a post request

//////////////////////////////////////////////
// Index Routes
//////////////////////////////////////////////
app.get("/", (req, res) => {
  res.render("index.liquid");
});


app.get('/home', (req, res) => {
    res.render('home', {
      
     
      
      
    })
   
})

app.get('/signup', (req, res) => {
  res.render('signup')
})



app.get('/schedule', (req, res) => {
    res.render('schedule')
})


app.get('/dojoLounge', (req, res) => {
    res.render('dojoLounge')
})


app.get('/profile', (req, res) => {
    res.render('myprofile')
})
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////

app.listen(PORT, () => console.log(`Now Listening on port ${PORT} @dbic`));

