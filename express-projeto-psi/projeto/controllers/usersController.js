var UserModel = require('../schemas/user');
var PhotoModel = require('../schemas/photo');


exports.user_get = function(req, res) {
    id = req.params.id;
    UserModel.find({ _id: id }, function(err, model) {
        if (err) {
            res.json({ Error: "User not found." });
        } else {
            res.json(model);
        }
    });
}

exports.user_post = function(req, res) {
    data = req.body;
    UserModel.create({ name: data.name, password: data.password }, function(err, model) {
        if (err) {
            res.json({ Error: "error while creating user" });
        } else {
            res.json(model);
        }
    });
}

exports.user_delete = function(req, res) {
    id = req.params.id;
    UserModel.remove({ _id: id }, function(err) {
        if (err) {
            res.json({ Error: "User not found." });
        } else {
            res.json({ INFO: "User deleted" });
        }
    });
}

exports.user_put = function(req, res) {
    var user = req.query.user;
    var pass = req.query.pass;

    UserModel.find({ name: user }, function(err, results) {
        if (err) {
            res.json({ error: "error while creating user" });
            return;
        }
        if (!results.length) { // there is no one with that name
            var response = { error: [], existsUser: false };
            response = checkUsername(user, response);
            if (response.error) {
                res.json(response);
                return;
            }
            response = checkPassword(pass, response);
            if (response.error) {
                res.json(response);
                return;
            }
        } else { // there is someone with that name
            res.json({ error: [], existsUser: true });
            return;
        }
    })
    res.json({ msg: "Succsessful" });
}

function checkUsername(user, response) {
    if (!alphanumeric(user)) {
        response.error.push("Name has non alphanumeric characters");
    }
    if (user.length < 3) {
        response.error.push("Name has less than 3 characters")
    }
    if (pass.length < 8) {
        response.error.push("Password has less than 8 characters")
    }
    return response;
}

function checkPassword(pass, response) {
    if (!hasUpper(pass)) {
        response.error.push("Password doesn't have uppercase characters")
    }
    if (!hasLower(pass)) {
        response.error.push("Password doesn't have lowercase characters")
    }
    if (hasNumbers(pass))
        return response;
}

function hasUpper(pass) {
    return pass.match(/[A-Z]/);
}

function hasLower(pass) {
    return pass.match(/[a-z]/);
}

function hasNumbers(pass) {
    return /\d/.test(pass)
}

function alphanumeric(inputtxt) {
    return pass.match(/^[0-9a-zA-Z]+$/);
}