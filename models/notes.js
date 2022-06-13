const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

//////////////////////////////////////////////
// Notes Model
//////////////////////////////////////////////
const noteSchema = new Schema(
    {
    date: String,
    typeoftraining: String,
    notes: String,
}, 
{timestamps: true }
)

const Note = model('note', noteSchema)

module.exports = Note 

// const notes = [
//     {
//         user:'Daniel B',
//         date: '11/21/11',
//         typeoftraining: 'gi or no gi',
//         notes: 'I armbarred the fuck out of everyone',

//     },
//     {
//         user:'Brynlin Curry',
//         date: '9/21/11',
//         typeoftraining: 'gi or no gi',
//         notes: 'I armbarred the fuck out of everyone',
//     },
//     {
//         user:'Brayden Ragosta',
//         date: '02/21/11',
//         typeoftraining: 'gi or no gi',
//         notes: 'I armbarred the fuck out of everyone',
//     }
// ]

// module.exports = notes 