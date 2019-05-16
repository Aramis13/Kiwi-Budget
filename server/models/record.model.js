const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecordShema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    description: { type: String, require: false },
    cost: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Record', RecordShema);