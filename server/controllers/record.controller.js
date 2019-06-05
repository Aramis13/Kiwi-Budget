const Record = require('../models/record.model');
const AuthController = require('./authentication.controller');
const User = require('../models/user.model');
const Connection = require('../models/connection.model');

exports.AddRecord = function (req, res) {
    let data = AuthController.verifyToken(req, res);
    if (data.auth){
        let email = data.message.id;
        User.findOne({email: email}).then(user => {
            let info = req.body;
            let record = new Record({
                email: email,
                name: user.userName,
                date: info.date,
                category: info.category,
                description: info.description,
                cost: info.cost
            });
            return record.save();
        }).then((obj, err) => {
            if (err) throw err;
            res.send(200, true);
        }).catch(e => {
            res.send(500, e);
        });
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
    let records = [];
    if (data.auth){
        let email = data.message.id;
        Record.find({email: email}).then(userRecords => {
            userRecords.forEach(record => {
                records.push({
                    id: record._id,
                    Name: record.name,
                    Date: new Date(record.date).toISOString().slice(0, 10),
                    Category: record.category,
                    Description: record.description,
                    Cost: record.cost
                });
            });
            return;
        }).then(() => {
            return Connection.findOne({email: email});
        }).then(connectionsInfo => {
            if (connectionsInfo != null)
                return Record.find({email: {$in: connectionsInfo.connections}});
            else
                return [];
        }).then(connectionsRecords => {
            connectionsRecords.forEach(record => {
                records.push({
                    id: record._id,
                    Name: record.name,
                    Date: new Date(record.date).toISOString().slice(0, 10),
                    Category: record.category,
                    Description: record.description,
                    Cost: record.cost
                });
            });
            return;
        }).then(() => {
            res.status(200).send(records);
        }).catch(e => {
            res.send(500, false);
        });   
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