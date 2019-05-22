const Connection = require('../models/connection.model');
const AuthController = require('./authentication.controller');
const User = require('../models/user.model');

exports.AddConnection = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){

        let email = data.message.id;
        let connection = req.body.connection;
        Connection.findByIdAndUpdate(email,
            {$push: {connections: connection}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                console.log(err);
                }else{
                //do stuff
                }
            }
        );
    }
    else {
        res.send(false);
    }
}