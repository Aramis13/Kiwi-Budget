const Entry = require('../models/entry.model');
const AuthController = require('../controllers/authentication.controller');


exports.addEntry = function (req, res, next){
    let session = AuthController.verifyToken(req, res);
    if (session.auth){
        let data = req.body;
        let entry = new Entry({
            plate: data.plate,
            model: data.model,
            date: data.date,
            mechanic: data.mechanic,
            type: data.type,
            description: data.description,
            status: data.description
        });
        entry.save(function (err) {
            if (err) return next(err);
            res.send('Entry Created successfully')
        });  
    }
    else{
        res.status(500).send(session);
    } 
}