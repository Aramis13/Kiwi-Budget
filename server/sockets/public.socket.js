const http = require('http');
const socket = require('socket.io');
const authController = require('../controllers/authentication.controller');
const recordSocket = require('./record.socket');
const userSocket = require('./user.socket');
var io;

exports.GetIO = function () {
    return io;
}

exports.Initialize = function (app) {
    let server = http.createServer(app);
    io = socket(server);
    io.on('connection', ConnectionsListner);
    return server;
}

function ConnectionsListner (client) {
    
    // Connection
    console.log('Client connected...');
    client.on('disconnect', DisconnectListner);

    // User
    client.on('logedin', userSocket.JoinRoom.bind(null, client, io));
    client.on('logedOut', userSocket.HandleLogout.bind(null, client, io));

    // Records
    client.on('RecordAdded', recordSocket.NotifayRecordAdded);
}

function DisconnectListner () {
    console.log('Client disconnected...');
    userSocket.HandleLogout(this, io);
}

exports.GetEmail = function (client, token) {
    return getEmail(client, token);
}

function getEmail (client, session) {
    try {
        if (client.handshake.headers.cookie == null) return null;
        let arr = client.handshake.headers.cookie.split(';')
        let res;
        arr.forEach(element => {
           if (element.includes('portfolioManagerToken'))
            res = element.split('='); 
        });
        if (res == null && session != null) {
            res = ['', session];
        }
        if (res == null) return null;
        let token = {
            cookies: {
                portfolioManagerToken: res[1]
            }
        };
        let data = authController.verifyToken(token);
        if (data.auth)
            return data.message.id;
        else
            return null;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
