const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user.router');
const entry = require('./routes/entry.router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const path = require('path');
//var server = require('http').Server(app);
//var io = require('socket.io')(server);

// server.listen(80);

// io.on('connection', function (socket) {
//     console.log('Client Connected!');
//     socket.emit('hello', {msg: 'hello from server'});
//   });

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
app.use('/api/entry', entry);

// app.get('*', function(req, res){
//     res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
// });

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));