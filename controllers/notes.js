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
  
//Index route

// index route
router.get("/notes.liquid", (req, res) => {
  // find all the notes
  // Note.find({ username: req.session.username })
  //   // render a template after they are found
  //   .then((notes) => {
  //     console.log(notes);
  //     res.render("/notes.liquid", { notes });
  //   })
  //   // send error as json if they aren't
  //   .catch((error) => {
  //     console.log(error);
  //     res.json({ error });
  //   });
});


// new route
router.get("/notes/new", (req, res) => {
    res.render("/newnote.liquid");
  });
  

// create route
router.post("/notes", (req, res) => {
    res.render('notes')
//   // add username to req.body to track related user
//   req.body.username = req.session.username;
//   // create the new fruit
//   Note.create(req.body)
//     .then((notes) => {
//       // redirect user to index page if successfully created item
//       res.redirect("/notes");
//     })
//     // send error as json
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
});

  
  router.delete("notes/:id", (req, res) => {
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
  

  //update route
router.put("note/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the fruit
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
  

  // edit route
router.get("notes/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the note from the database
    Note.findById(id)
      .then((note) => {
        // render edit page and send note data
        res.render("/editnote", { fruit });
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  

// show route
router.get("notes/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
  
    // find the particular note from the database
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
  


//export the router//
module.exports = router