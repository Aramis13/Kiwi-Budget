const Record = require('../models/record.model');
const AuthController = require('./authentication.controller');
const User = require('../models/user.model');

exports.AddRecord = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        try {
            let email = data.message;
            let name;
            User.findOne({email: email}, 'userName', function (err, userName){
                if (err) res.status(500).end();
                name = userName;
            });
            let info = req.body;
            let record = new Record({
                email: email,
                name: name,
                date: info.date,
                type: info.type,
                description: info.description,
                cost: info.cost
            });

            record.save(function (err){
                if (err) res.status(500).end();
                res.status(200).send();
            });
        }
        catch {
            res.status(500).end();
        }
    }
    else {
        res.staus(500).send(data.message);
    }
}