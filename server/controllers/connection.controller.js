const Connection = require('../models/connection.model');
const AuthController = require('./authentication.controller');
const UserController = require('./user.controller');

exports.AddConnection = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let email = data.message.id;
        let connection = req.body.email;
        Connection.findOneAndUpdate({email: email},
            {$addToSet: {connections: connection}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err) res.status(500).send(false);
                else res.status(200).send({
                    Username: UserController.GetUserName(connection), // Todo: use sockets
                    Email: connection
                });
            }
        );
    }
    else {
        res.send(false);
    }
}

exports.RemoveConnection = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth) {
        let email = data.message.id;
        let connectionEmail = req.body.connectionEmail;
        Connection.findByIdAndUpdate(email,
            {$pull: {connections: connectionEmail}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err) res.status(500).send(false);
                else res.status(200).send(true);
            }
        );
    }
    else {
        res.send(null);
    }
}

exports.GetConnections = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth) {
        let email = data.message.id;
        Connection.findOne({email: email}, function (err, result){
            if (err) res.status(500).send(null);
            else {
                if (result == null) {
                    res.status(200).send([]);
                    return;
                } 
                let data = [];
                result.connections.forEach(email => {
                    data.push({
                        Username: UserController.GetUserName(email), // Todo: use sockets
                        Email: email
                    });
                });
                res.status(200).send(data);
            }
        });
    }
    else {
        res.send(null);
    }
}