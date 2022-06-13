//require .env file ran "npm i dotenv --save"
require("dotenv").config()

//////////////////////////////////////////////
//setting up express and liquid and all of the variables here
//////////////////////////////////////////////// 
const express = require('express')
const path = require('path')
const app = require('liquid-express-views')(express(), {root: [path.resolve(__dirname, 'views/')]})
const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost/notes'
const db = mongoose.connection
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const MongoStore = require('connect-mongo')
const PORT = 2022

const notes = require('./models/notes')


/////////////////////////////////////////////////////
// Connect mongoose
/////////////////////////////////////////////////////


mongoose.connect(mongoURI)
/////////////////////////////////////////////////////
// Connection error/success Callbacks for various events
/////////////////////////////////////////////////////

db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: ", mongoURI));
db.on("close", () => console.log("mongo disconnected"));

// const firstNote = {
//   date: "June 19th 2022",
//   typeoftraining: "Gi",
//   notes: "I left the earth and flying armbarred everyone",
// }
// Note.create(firstNote)
// // if database transaction succeeds
// .then((note) => {
//   console.log(note)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })
/////////////////////////////////////////////////////
// Google Api for schedule view
/////////////////////////////////////////////////////
// const {google} = require('googleapis')
// const {OAuth2} = google.auth
// const oAuth2Client = new OAuth2('140118733221-m85uffglmisuai7grago37pha6blst3g.apps.googleusercontent.com', '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')
 
// oAuth2Client.setCredentials({
//     refresh_token: '1//04fhc6dp3L7-TCgYIARAAGAQSNwF-L9Ir9jNX2rcHILZsXLoxhXPoG9DOXa6AJ1nTxIcLpQEuj8CTkGtY2QpPms6o5SQ3seach38'
// })

// // Create a new calender instance.
// const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

// // Create a new event start date instance for temp uses in our calendar.
// const eventStartTime = new Date()
// eventStartTime.setDate(eventStartTime.getDay() + 2)

// // Create a new event end date instance for temp uses in our calendar.
// const eventEndTime = new Date()
// eventEndTime.setDate(eventEndTime.getDay() + 4)
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// // Create a dummy event for temp uses in our calendar
// const event = {
//   summary: `Meeting with David`,
//   location: `3595 California St, San Francisco, CA 94118`,
//   description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
//   colorId: 1,
//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'America/Denver',
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: 'America/Denver',
//   },
// }

// // Check if we a busy and have an event on our calendar for the same time.
// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: 'America/Denver',
//       items: [{ id: 'primary' }],
//     },
//   },
//   (err, res) => {
//     // Check for errors in our query and log them if they exist.
//     if (err) return console.error('Free Busy Query Error: ', err)

//     // Create an array of all events on our calendar during that time.
//     const eventArr = res.data.calendars.primary.busy

//     // Check if event array is empty which means we are not busy
//     if (eventArr.length === 0)
//       // If we are not busy create a new calendar event.
//       return calendar.events.insert(
//         { calendarId: 'primary', resource: event },
//         err => {
//           // Check for errors and log them if they exist.
//           if (err) return console.error('Error Creating Calender Event:', err)
//           // Else log that the event was created.
//           return console.log('Calendar event successfully created.')
//         }
//       )

//     // If event array is not empty log that we are busy.
//     return console.log(`Sorry I'm busy...`)
//   }
// )



// const PORT = process.env.PORT;
/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

app.use(express.json()) // This prepares our api to receive json data from the body of all incoming requests.
//////////////////////////////////////////////
// middleware to setup session
//////////////////////////////////////////////

app.use(express.urlencoded({
  extended: false
})) // allows us to view body of a post request

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
//////////////////////////////////////////////
// added a model for notes and started the note show pages
//////////////////////////////////////////////
app.get('/notes', (req, res) => {
    res.render('notes', {
      allNotes: notes
    })
})
//////////////////////////////////////////////
// added a post route for new note
//////////////////////////////////////////////
app.post('/notes', (req, res) => {
  notes.push(req.body);
  console.log(req.body)
  res.redirect('/notes')
})

app.get('/notes/new', (req, res) => {
  res.render('newnote')
})

app.get('/notes/:id', (req, res) => {
  res.render('noteShow', {
    notes: notes[req.params.id]
  })
})
//////////////////////////////////////////////
// delete route for notes
//////////////////////////////////////////////

app.delete('/notes/:id', (req, res) => {
  notes.splice(req.params.id, 1) // removes item from array
  res.redirect('/notes') //redirects back to index page
})

//////////////////////////////////////////////
// edit routes for notes
//////////////////////////////////////////////
app.get('/notes/:id/edit', (req, res) => {
  res.render(
      'editnote',
      {
          note: notes[req.params.id], 
          index: req.params.id
      }
  )
})

app.put('/notes/:id', (req, res) => {
  
  notes[req.params.id] = req.body
  res.redirect('/notes')
})

//////////////////////////////////////////////
// end notes routes
//////////////////////////////////////////////

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

