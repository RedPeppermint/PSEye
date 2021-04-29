var PhotoModel = require('../schemas/photo');
var UserModel = require('../schemas/user');
const db = require('mongoose').connection;
exports.photo_get = function (req, res) {
    id = req.params.id;
    PhotoModel.find({ _id: id }, function (err, model) {
        if (err) {
            res.status(500).json({ Error: "Photo not found." });
        } else {
            res.status(200).json(model);
        }
    });
}

function photosGetAll(res, number_of_results) {
    PhotoModel.find().limit(number_of_results).then(results => res.status(200).json(results)).catch(err => {
        console.log(err);
        res.status(500).json({ Error: "Error while fetching photos." });
    });
}

function photosFiltered(res, filter_used, number) {
    PhotoModel.find().sort({
        [filter_used]: -1
    }).limit(number).then(results => res.status(200).json(results)).catch(err => {
        console.log(err);
        res.status(500).json({ Error: "Error while fetching photos." });
    })

}

function like(photo_id, user_id, res) {
    UserModel.find({ _id: user_id }, function (err, model) {
        if (err) {
            res.json({ Error: "User not found." });
        } else {
            console.log(model);
            PhotoModel.updateOne({ _id: photo_id }, { $push: { likes: user_id } }, function (err) {
                if (err) {
                    res.status(500).json({ Error: "Error putting like on photo" });
                } else {
                    res.status(200).json({ INFO: "Liked" });
                }
            });
        }
    });
}

function favourite(photo_id, user_id, res) {
    UserModel.find({ _id: user_id }, function (err, model) {
        if (err) {
            res.json({ Error: "User not found." });
        }
        else {
            console.log(model);
            PhotoModel.updateOne({ _id: photo_id }, { $push: { faves: user_id } }, function (err) {
                if (err) {
                    res.status(500).json({ Error: "Error favouriting on photo" });
                } else {
                    res.status(200).json({ INFO: "Favourited" });
                }
            });
        }
    })
}

exports.photo_update = function (req, res) {
    id = req.params.id;
    action = req.body.action;
    user = req.body.user;
    if (action == "like") {
        console.log("ACTION LIKE");
        like(id, user, res)
    }
    else if (action == "favourite") {
        console.log("ACTION FAVOURITE");
        favourite(id, user, res)
    }

}

exports.photos_get = function (req, res) {
    filter = req.query.filter;
    number_of_results = parseInt(req.query.number_of_results);
    if (filter) {
        photosFiltered(res, filter, number_of_results);
    } else {
        photosGetAll(res, number_of_results);
    }
}

exports.photo_post = function (req, res) {
    photos = req.body.photos;
    id = req.body.user_id;
    PhotoModel.insertMany(photos).then(val => {
        const ids = val.map(val => val._id);
        UserModel.updateOne({ _id: id }, {
            $push: { photos_id: { $each: ids } }
        }, function (err) {
            if (err) {
                console.log(err);
                res.status(500).json({ Error: "error while creating photo" });
            } else {
                res.status(200).json({ INFO: "Photos posted" });
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ Error: "error while creating photo" });
    })
}

exports.photo_delete = function (req, res) {
    id = req.params.id;
    PhotoModel.findByIdAndRemove({ _id: id }, function (err, result) {
        if (err) {
            res.status(500).json({ Error: "Photo not found." });
        } else {
            UserModel.findByIdAndUpdate(result.user_id, { $pull: { photos_id: id } }, function (err) {
                if (err) {
                    res.status(500).json({ Error: "Error trying to delete photo from user." });
                } else {
                    res.status(200).json({ INFO: "Photo deleted" });
                }
            });
        }
    });
}