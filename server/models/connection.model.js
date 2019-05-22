const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConnectionShema = new Schema({
    email: { type: String, required: true },
    connections: { type: Array}
});

// Export the model
module.exports = mongoose.model('Connection', ConnectionShema);