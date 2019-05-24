const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConfigurationShema = new Schema({
    email: { type: String, required: true },
    theme: { theme: String }
});

// Export the model
module.exports = mongoose.model('Configuration', ConfigurationShema);