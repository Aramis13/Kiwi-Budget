const User = require('../models/user.model');
const AuthController = require('./authentication.controller');

exports.Login = function(req , res) {
    let data = req.body;
    try{
        User.findOne({email: data.email}, function(err, user){
            if (err) next (err);
            if (user){
                if (AuthController.verifyPassword(user.password, data.password)){
                    let token = AuthController.signUser(user._id);
                    res.status(200).send({auth: true, token: token, userName: user.userName});
                }
                else{
                    res.send({auth: false, message: 'Invalid Password!'});
                    //res.status(418).send({auth: false, message: 'Happy Easter!'});
                }
            }
            else{
                res.send({auth: false, message: 'Invalid Email!'});
            }
       });
    }
    catch{
        res.status(500).end();
    }
}

exports.CreateUser = function (req, res) {
    let data = req.body;
    let response = {
        success: '',
        message: '',
        token: ''
    }
    User.findOne({email: data.email}, function (err, user){
        if (err) return err;
        if (user){
            response.success = false;
            response.message = 'Email alredy exits in system!';
            res.send(response);
        } 
        else{
            let user = new User({
                userName: data.userName,
                email: data.email,
                password: data.password
            });
        
            user.password = AuthController.hashPassword(data.password);
            
            user.save(function (err) {
                if (err) return err;
                response.success = true;
                response.message = 'User Created successfully';
                let token = AuthController.signUser(user.password);
                response.token = token;
                res.status(200).send(response);
            });  
        }   
    });
}

exports.DeleteUser = function (req, res) {
    let data = req.body;
    User.findOneAndRemove({email: data.email}, function(err, user){
        if (err) return err;
        if (user) res.status(200).send({success: true, msg: user.firstname + ' ' + user.lastname + ' was removed'})
        else res.send({success: false, msg: user.firstname + ' ' + user.lastname + ' was not found'})
    });
}
