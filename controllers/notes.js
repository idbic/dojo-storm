//import dependencies//

const express = require('express')
const Note = require('../models/notes')

//create route//

const router = express.Router()

//routes//

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
// router.use((req, res, next) => {
//   if (req.session.loggedIn) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// });
  
router.get("/seed", (req, res) => {
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

// index route

router.get("/", (req, res) => {
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


// create route
router.post("/", (req, res) => {
  
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
router.get("/new", (req, res) => {
  res.render("newnote.liquid");
});

  
  router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the note
    Note.findByIdAndRemove(id)
      .then((fruit) => {
        // redirect to main page after deleting
        res.redirect("/notes");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  

 // //////////////////////////////////////////////
// // edit routes for notes
// //////////////////////////////////////////////
// edit route
router.put("/:id", (req, res) => {
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

router.get("/:id/edit", (req, res) => {
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
router.get("/:id", (req, res) => {
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



router.delete("/:id", (req, res) => {
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


//export the router//
module.exports = router