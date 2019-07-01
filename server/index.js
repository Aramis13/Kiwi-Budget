const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user.router');
const record = require('./routes/record.route');
const configuration = require('./routes/configuration.route');
const connection = require('./routes/connection.route');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const path = require('path');
const socket = require('./sockets/public.socket');
const server = socket.Initialize(app);

let mongoDB = config.get('MONGODB_URI');
mongoDB = 'mongodb://idan-agam:a3fkBZy1CSFOBIve@gmcluster-shard-00-00-p1jrs.mongodb.net:27017,gmcluster-shard-00-01-p1jrs.mongodb.net:27017,gmcluster-shard-00-02-p1jrs.mongodb.net:27017/main-DB?ssl=true&replicaSet=GmCluster-shard-0&authSource=admin&retryWrites=true'
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
app.use('/api/configuration', configuration);
app.use('/api/connection', connection);

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));