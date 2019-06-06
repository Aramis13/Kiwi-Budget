const http = require('http');
const socket = require('socket.io');
const authController = require('../controllers/authentication.controller');
const Connection = require('../models/connection.model');
const User = require('../models/user.model');
var io;

exports.Initialize = function (app) {
    let server = http.createServer(app);
    io = socket(server);

    io.on('connection', ConnectionsListner);

    return server;
}

function ConnectionsListner (client) {
    console.log('Client connected...');
    client.on('disconnect', DisconnectListner);
    client.on('logedin', JoinRoom.bind(null, client, io));
    client.on('RecordAdded', NotifayRecordAdded);
}

function DisconnectListner () {
    console.log('Client disconnected...');
}

function GetEmail (client) {
    if (client.handshake.headers.cookie == null) return;
    let arr = client.handshake.headers.cookie.split(';')
    let res;
    arr.forEach(element => {
       if (element.includes('portfolioManagerToken'))
        res = element.split('='); 
    });
    if (res == null) return;
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

function JoinRoom (client, io) {
    console.log('Joining Room');
    let email = GetEmail(client);
    console.log(email + ' Joining');
    if (email){
        Connection.findOne({email: email}).then(response => {
            if (response == null) return;
            let rooms = io.sockets.adapter.rooms;
            let joined = false;
            response.connections.forEach(email => {
                let room = rooms[email];
                if (room) {
                    client.join(email);
                    joined = true;
                    return;
                }
            });
            if (!joined)
                client.join(response.email);
        })
        .catch(e => {
            console.error(e);
        });
    }
}

function NotifayRecordAdded (record) {
    console.log('Notifaying Connections')
    let email = GetEmail(this);
    let roomName;
    if (email) {
        Connection.findOne({email: email}).then(response => {
            if (response == null) return;
            let rooms = io.sockets.adapter.rooms;
            response.connections.forEach(conn => {
                let room = rooms[conn];
                if (room) {
                    roomName = conn;
                    return;
                }
            });
            if (!roomName)
                roomName = email;
            return User.findOne({email: email});
        })
        .then(user => {
            this.to(roomName).emit('RecordAdded', {
                message: user.userName + ' added a new record',
                record
            });
        })
        .catch(e => {
            console.error(e);
        });
    }
}