const Record = require('../models/record.model');
const AuthController = require('./authentication.controller');
const User = require('../models/user.model');

exports.AddRecord = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        try {
            let email = data.message.id;
            User.findOne({email: email}, 'userName', function (err, obj){
                if (err) res.status(500).end();
                let info = req.body;
                let record = new Record({
                    email: email,
                    name: obj.userName,
                    date: info.date,
                    category: info.category,
                    description: info.description,
                    cost: info.cost
                });
                record.save(function (err){
                    if (err) res.status(500).end();
                    res.status(200).send(true);
                });
            });
        }
        catch {
            res.status(500).end();
        }
    }
    else {
        res.send(false);
    }
}

exports.EditRecord = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let record = req.body.record;
        Record.findOneAndUpdate({_id: record.id}, {
            date: record.Date,
            category: record.Category,
            description: record.Description,
            cost: record.Cost
        }, function (err, doc, result) {
            if (err) res.status(500).end();
            res.status(200).send(true);
        });
    }
    else {
        res.send(false);
    }
}

exports.GetRecords = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let email = data.message.id;
        Record.find({ email: email}, function (err, arr){
            if (err) res.status(500).end();
            let records = [];
            arr.forEach(record => {
                records.push({
                    id: record._id,
                    Name: record.name,
                    Date: new Date(record.date).toISOString().slice(0, 10),
                    Category: record.category,
                    Description: record.description,
                    Cost: record.cost
                });
            })
            res.status(200).send(records);
        })
    }
    else {
        res.send(false);
    }
}

exports.DeleteRecord = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let id = req.body.id;
        Record.findOneAndDelete({_id: id}, function (err, result) {
            if (err) res.status(500).send(false);
            res.status(200).send(true);
        })
    }
    else {
        res.send(false);
    }
}