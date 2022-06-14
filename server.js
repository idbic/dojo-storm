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
const { ObjectId } = require("mongodb")
const PORT = 2022




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

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make note schema
const noteSchema = new Schema({
  date: String,
  typeoftraining: String,
  notes: String,
});

// make note model
const Note = model("Note", noteSchema);
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

app.get("/notes/seed", (req, res) => {
  // array of starter notes
  const seedNotes = [
    {date: 'that day', typeoftraining: 'gi', notes: 'I jiu jitsued'},
    {date: 'the days', typeoftraining: 'gi', notes: 'I got sued'},
    {date: 'these days', typeoftraining: 'gi', notes: 'Arm bar nation'},
    {date: 'Thursday', typeoftraining: 'gi', notes: 'Really good passing '},
    {date: 'June 12th 1989', typeoftraining: 'gi', notes: 'Toreando'}
  ];

  // Delete all notes
  Note.deleteMany({}).then((data) => {
    // Seed Starter notes
    Note.create(seedNotes).then((data) => {
      // send created notes as response to confirm creation
      res.json(data);
    });
  });
});

app.get('/schedule', (req, res) => {
    res.render('schedule')
})
//////////////////////////////////////////////
// added a model for notes and started the note show pages
//////////////////////////////////////////////
// updated note index route with mongoose .then method//
//////////////////////////////////////////////

app.get("/notes", (req, res) => {
  // find all the fruits
  Note.find({})
    // render a template after they are found
    .then((seedNotes) => {
      res.render("notes", { seedNotes });
    })
    // send error as json if they aren't
    .catch((error) => {
      res.json({ error });
    });
});




//////////////////////////////////////////////
// added a post route for new note
//////////////////////////////////////////////
// app.post('/notes', (req, res) => {
//   Note.push(req.body);
//   console.log(req.body)
//   res.redirect('/notes')
// })

// app.get('/notes/new', (req, res) => {
//   res.render('newnote')
// })
// create route
app.post("/notes", (req, res) => {
  
  Note.create(req.body)
    .then((notes) => {
      // redirect user to index page if successfully created item
      res.redirect("/notes");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new route
app.get("/notes/new", (req, res) => {
  res.render("newnote.liquid");
});


// //////////////////////////////////////////////
// // edit routes for notes
// //////////////////////////////////////////////
// edit route
app.put("/notes/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
 
  Note.findByIdAndUpdate(id, req.body, { new: true })
    .then((note) => {
      // redirect to main page after updating
      res.redirect("/notes");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

app.get("/notes/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the notes from the database
  Note.findById(id)
    .then((note) => {
      // render edit page and send note data
      res.render("editnote.liquid", { note });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});


// app.put('/notes/:id', (req, res) => {
  
//   notes[req.params.id] = req.body
//   res.redirect('/notes')
// })


//////////////////////////////////////////////
// show route from database!
//////////////////////////////////////////////
app.get("/notes/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
console.log(id)
  // find the particular fruit from the database
  Note.findById(id)
    .then((note) => {
      // render the template with the data from the database
      res.render("noteshow", { note });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
//////////////////////////////////////////////
// delete route for notes
//////////////////////////////////////////////



app.delete("/notes/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the note
  Note.findByIdAndRemove(id)
    .then((note) => {
      // redirect to main page after deleting
      res.redirect("/notes");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});


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

