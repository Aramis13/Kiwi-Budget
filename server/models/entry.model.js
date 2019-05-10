const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EntrySchema = new Schema({
    plate: {type: String, required: true, max: 100},
    model: {type: String, required: true},
    date: {type: Date, default: Date.now},
    mechanic: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true}
});

// Export the model
module.exports = mongoose.model('Entry', EntrySchema);