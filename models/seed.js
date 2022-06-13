//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require('./connection')
const Note = require('./notes')
const db = mongoose.connection

//////////////////////////////////////////////
// Data Seed
//////////////////////////////////////////////
db.on("open", () => {
const seedNotes = [
    {date: 'that day', typeoftraining: 'gi', notes: 'I jiu jitsued'},
    {date: 'the days', typeoftraining: 'gi', notes: 'I got sued'},
    {date: 'these days', typeoftraining: 'gi', notes: 'Arm bar nation'},
    {date: 'Thursday', typeoftraining: 'gi', notes: 'Really good passing '},
    {date: 'June 12th 1989', typeoftraining: 'gi', notes: 'Toreando'}
]

Note.deleteMany({})
      .then((deletedNotes) => {
        // add the starter fruits
        Note.create(seedNotes)
          .then((newNotes) => {
            // log the new note to confirm their creation
            console.log(newNotes);
            db.close();
          })
          .catch((error) => {
            console.log(error);
            db.close();
          });
      })
      .catch((error) => {
        console.log(error);
        db.close();
      });
  
    /////////////////////////////////////////////
    // Write your Seed Code Above
    ////////////////////////////////////////////
  });