var UserModel = require('../schemas/user');

// Login 
exports.user_login = function(req, res) {
    var name = req.query.name;
    var password = req.query.password;
    UserModel.findOne({ name: name, password: password }, function(err, result) {
        if (err) {
            res.json({ error: "error while logging in user" });
            console.log("deu erro");
        } else if (result) {
            console.log("Consegui login");
            res.json({
                response: "Login Successful"
            });
        } else {
            res.json({
                response: "Login Failed"
            });
        }
    });
}

// get user
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
    // UC10 Registo do utilizador
exports.user_post = function(req, res) {
    var name = req.query.name;
    var password = req.query.password;

    UserModel.find({ name: name }, function(err, results) {
        if (err) {
            res.json({ error: "error while creating user" });
        } else if (results) { // there is no one with that name
            var response = { error: [], existsUser: false };
            response = checkUsername(name, response);
            if (response.error) {
                res.json(response);
            } else { // user ok
                response = checkPassword(password, response);
                if (response.error) {
                    res.json(response);
                } else { // password ok
                    res.json({ msg: "Succsessful" });
                }
            }
        } else { // there is someone with that name
            res.json({ error: [], existsUser: true });
        }
    });
}

function checkUsername(user, response) {
    if (!alphanumeric(user)) {
        response.error.push("Name has non alphanumeric characters");
    }
    if (user.length < 3) {
        response.error.push("Name has less than 3 characters")
    }

    return response;
}

function checkPassword(pass, response) {
    if (pass.length < 8) {
        response.error.push("Password has less than 8 characters")
    }
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