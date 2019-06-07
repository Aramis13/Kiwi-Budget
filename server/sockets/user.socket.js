const Connection = require('../models/connection.model');
const User = require('../models/user.model');
const PublicSocket = require('./public.socket');

exports.JoinRoom = function (client, io) {
    let useremail = PublicSocket.GetEmail(client);
    let roomEmail;
    console.log(useremail + ' Joining');
    if (useremail){
        Connection.findOne({email: useremail}).then(response => {
            if (response == null) return;
            roomEmail = response.email;
            let rooms = io.sockets.adapter.rooms;
            let joined = false;
            response.connections.forEach(email => {
                let room = rooms[email];
                if (room) {
                    client.join(email);
                    roomEmail = email
                    joined = true;
                    return;
                }
            });
            if (!joined)
                client.join(response.email);
            return User.findOneAndUpdate({email: useremail}, {status: true}, {new: true});
        })
        .then(response => {
            console.log(response.userName + ' loged in');
            client.to(roomEmail).emit('NewLogin', {
                message: response.userName + ' loged in',
                connection: response
            })
        })
        .catch(e => {
            console.error(e);
        });
    }
}

exports.HandleLogout = function (client, io) {
    let useremail = PublicSocket.GetEmail(client);
    let roomEmail;
    if (useremail) {
        Connection.findOne({email: useremail}).then(response => {
            if (response == null) return;
            roomEmail = response.email;
            let rooms = io.sockets.adapter.rooms;
            response.connections.forEach(email => {
                let room = rooms[email];
                if (room) {
                    roomEmail = email;
                    return;
                }
            });
            
            return User.findOneAndUpdate({email: useremail}, {status: false}, {new: true});
        })
        .then(response => {
            console.log(useremail + ' loged out');
            if (roomEmail) {
                client.to(roomEmail).emit('NewLogout', {
                    response     
                });
            }
        })
        .catch(e => {
            console.error(e);
        })
    }
}
