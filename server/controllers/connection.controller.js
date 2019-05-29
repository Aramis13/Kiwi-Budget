const Connection = require('../models/connection.model');
const AuthController = require('./authentication.controller');
const User = require('../models/user.model');

exports.AddConnection = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let email = data.message.id;
        let connection = req.body.email;
        Connection.findOneAndUpdate({email: email},
        {$addToSet: {connections: connection}}, {safe: true, upsert: true}).then(response => {
            if (response == null) throw 'Failed to add connection!';
            return User.findOne({email: connection});
        })
        .then(user => {
            if (user == null) throw 'User Not In System';
            res.send(200, {
                Username: user.userName,
                Email: user.email
            });       
        })
        .catch(e => {
            res.send(500, null);
        });
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
        Connection.findOne({email: email}).then(response => {
            if (response == null) throw 'No connections found!';
            return User.find({email: {$in: response.connections}});
        })
        .then(users => {
            let data = [];
            users.forEach(user => {
                data.push({
                    Username: user.userName,
                    Email: user.email
                });
            });
            res.send(200, data);
        })
        .catch(e => {
            res.send(500, null);
        })
    }
    else {
        res.send(500, null);
    }
}