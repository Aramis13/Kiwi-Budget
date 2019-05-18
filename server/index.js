const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user.router');
const record = require('./routes/record.route')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const path = require('path');


let mongoDB = config.get('MONGODB_URI');
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api/user', user);
app.use('/api/record', record);

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));