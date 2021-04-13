var UserModel = require('../schemas/user');

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

