const Connection = require('../models/connection.model');
const AuthController = require('./authentication.controller');

exports.AddConnection = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let email = data.message.id;
        let connection = req.body.connection;
        Connection.findByIdAndUpdate(email,
            {$push: {connections: connection}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err) res.status(500).send(false);
                else res.status(200).send(true);
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
        Connection.findOne({email: email}, 'connections', function (err, connections){
            if (err) res.status(500).send(null);
            else {
                res.status(200).send(connections);
            }
        });
    }
    else {
        res.send(null);
    }
}