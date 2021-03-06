var UserModel = require('../schemas/user');
const shared_secret = require('../sharedSecret').shared_secret;
const jwt = require('jsonwebtoken');

function generateAndSendToken(user, res) {
    var token = jwt.sign({ userID: user._id }, shared_secret, { expiresIn: '2h' });
    res.json({
        token: token,
        model: JSON.stringify(user)
    });
}

// Login 
exports.user_login = function (req, res) {
    console.log("Body: " + JSON.stringify(req.body));
    var name = req.body.username;
    var password = req.body.password;
    UserModel.findOne({ name: name, password: password }, function (err, result) {
        if (err) {
            res.json({
                response: false
            });
        } else if (result) {
            generateAndSendToken(result, res);
        } else {
            res.json({
                response: false
            });
        }
    });
}

// get user
exports.user_get = function (req, res) {
    var id = req.params.id;
    UserModel.find({ _id: id }, function (err, model) {
        if (err) {
            res.json({ Error: "User not found." });
        } else {
            res.json(model);
        }
    });
}

exports.user_delete = function (req, res) {
    var id = req.params.id;
    UserModel.remove({ _id: id }, function (err) {
        if (err) {
            res.json({ Error: "User not found." });
        } else {
            res.json({ INFO: "User deleted" });
        }
    });
}

function generateAndSendTokenRegister(user, res) {
    var token = jwt.sign({ userID: user._id }, shared_secret, { expiresIn: '2h' });
    res.json({
        token: token,
        model: JSON.stringify(user),
        error: [],
        existsUser: false
    });
}

// UC10 Registo do utilizador
exports.user_post = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    UserModel.find({ name: username }, function (err, results) {
        console.log(err);
        if (err) {
            res.json({
                error: ["error while creating user"]
            });
        } else if (!results.length) { // there is no one with that name
            var response = { error: [], existsUser: false };
            response = checkUsername(username, response);
            if (response.error.length) {
                res.json(response);
            } else { // user ok
                response = checkPassword(password, response);
                if (response.error.length) {
                    res.json(response);
                } else { // password ok, criar user na base de dados
                    var newUser = new UserModel({
                        name: username,
                        password: password
                    });
                    newUser.save(function (err, user) {
                        if (err) { return next(err); }
                    });
                    //gerar token: user logged in

                    generateAndSendTokenRegister(newUser, res)
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

function alphanumeric(pass) {
    return pass.match(/^[0-9a-zA-Z]+$/);
}