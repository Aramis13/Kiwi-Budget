const AuthController = require('./authentication.controller');
const Configuration = require('../models/configuration.model');

exports.ChangeTheme = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let useremail = data.message.id;
        let newtheme = req.body.theme;
        Configuration.findOneAndUpdate({email: useremail}, {theme: newtheme}, {upsert: true}, function (err, result) {
            if (err) {
                res.send(500, false);
                return;
            } 
            res.send(200, true);
        });
    }
    else {
        res.send(false);
    }
}

exports.GetTheme = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let email = data.message.id;
        Configuration.findOne({email: email}, function (err, config) {
            if (err) {
                res.send('light');
                return;
            } 
            if (config == null) {
                res.end('light');
                return;
            }
            res.send(200, config.theme.toObject());
        });
    }
    else {
        res.send('light');
    }
}