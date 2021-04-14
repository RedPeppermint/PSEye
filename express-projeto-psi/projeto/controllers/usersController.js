var UserModel = require('../schemas/user');
var PhotoModel = require('../schemas/photo');


exports.user_get = function (req, res) {
    id = req.params.id;
    UserModel.find({ _id: id }, function (err, model) {
        if (err) {
            res.json({ Error: "User not found." });
        }
        else {
            res.json(model);
        }
    });
}

exports.user_post = function (req, res) {
    data = req.body;
    UserModel.create({ name: data.name, password: data.password }, function (err, model) {
        if (err) {
            res.json({ Error: "error while creating user" });
        }
        else {
            res.json(model);
        }
    });
}

exports.user_put = function (req, res) {

}

exports.user_delete = function (req, res) {
    id = req.params.id;
    UserModel.remove({ _id: id }, function (err) {
        if (err) {
            res.json({ Error: "User not found." });
        }
        else {
            res.json({ INFO: "User deleted" });
        }
    });
}

