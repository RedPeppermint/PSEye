var PhotoModel = require('../schemas/photo');
var UserModel = require('../schemas/user');
var mongoose = require('mongoose');
const db = mongoose.connection;


exports.init = function (req, res) {
    db.collections.users.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
            res.json({ Error: err });
        }
        else {
            const users = [
                { name: "Brufen", password: 123 },
                { name: "Sussurro", password: 123 },
                { name: "Regras", password: 123 },
                { name: "Snoopy", password: 123 },
                { name: "Couves", password: 123 },
                { name: "Zagora", password: 123 }
            ]

            var errors = 0;
            users.forEach(user => {
                var m = new UserModel(user);
                m.save(function (err) {
                    if (err) {
                        errors += 1;
                    }
                })
            });

            res.json({ Errors: "Errors:" + errors });
        }
    });
}