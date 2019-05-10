const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const secret = config.get("salt");


exports.signUser = function (signingID) {
    var token = jwt.sign({ id: signingID }, secret, {
        expiresIn: 60 * 15 // expires in 15 minuets
    });
    return token;
}

exports.verifyToken = function (req, res) {
    let cookies = req.cookies;
    if (cookies){
        let token = cookies.token;
        if (token){
            try {
                let decoded = jwt.verify(token, secret);
                return { auth: true, message: decoded };
              } catch(err) {
                return { auth: false, message: 'Failed to authenticate token.' };
              }
        }
    }
    else return { auth: false, message: 'No token provided.' };
}

exports.verifyPassword = function(dbPassword, clientPassword) {
    return bcrypt.compareSync(clientPassword, dbPassword);
}

exports.hashPassword = function (password) {
    return bcrypt.hashSync(password, 10);
}