const publicSocket = require('./public.socket');
const Connection = require('../models/connection.model');
const User = require('../models/user.model');


exports.NotifayRecordAdded = function (record) {
    console.log('Notifaying Connections')
    let email = publicSocket.GetEmail(this);
    let roomName;
    if (email) {
        Connection.findOne({email: email}).then(response => {
            if (response == null) return;
            let io = publicSocket.GetIO();
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