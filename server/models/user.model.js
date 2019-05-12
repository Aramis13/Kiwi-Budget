const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserShema = new Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true}
});

// Export the model
module.exports = mongoose.model('User', UserShema);