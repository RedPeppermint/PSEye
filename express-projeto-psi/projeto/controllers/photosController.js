var PhotoModel = require('../schemas/photo');
var UserModel = require('../schemas/user');
const mongoose = require('mongoose');
const user = require('../schemas/user');
const db = mongoose.connection;

exports.photo_get = function(req, res) {
    id = req.params.id;
    PhotoModel.find({ _id: id }, function(err, model) {
        if (err) {
            res.status(500).json({ Error: "Photo not found." });
        } else {
            res.status(200).json(model);
        }
    });
}

exports.fav_photos_get = function(req, res) {
    user_id = req.params.id;
    UserModel.findById(user_id, function(err, result) {
        if (err) {
            res.status(500).json({ Error: "user not found." });
        } else {
            console.log("user: " + result);
            var ids = result.favourites.map(id => mongoose.Types.ObjectId(id));
            console.log("ids: " + ids);
            PhotoModel.find({ '_id': { $in: ids } }, function(err, results) {
                if (err) {
                    res.status(500).json({ Error: "problem getting favourite photos." });
                } else {
                    res.status(200).json(results);
                }
            });
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
    UserModel.find({ _id: user_id }, function(err, model) {
        if (err) {
            res.json({ Error: "User not found." });
        } else {
            console.log(model);
            PhotoModel.updateOne({ _id: photo_id }, { $push: { likes: user_id } }, function(err) {
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
    UserModel.updateOne({ _id: user_id }, { $push: { favourites: photo_id } }, function(err, model) {
        if (err) {
            res.status(500).json({ Error: "User not found." });
        } else {
            res.status(200).json({ INFO: "Favourited" });
        }
    })
}

exports.photo_update = function(req, res) {
    var id = req.params.id;
    var action = req.body.action;
    var user = req.body.user;
    if (action == "like") {
        like(id, user, res)
    } else if (action == "favourite") {
        favourite(id, user, res)
    }
}

exports.photos_get = function(req, res) {
    filter = req.query.filter;
    number_of_results = parseInt(req.query.number_of_results);
    if (filter) {
        photosFiltered(res, filter, number_of_results);
    } else {
        photosGetAll(res, number_of_results);
    }
}

exports.photo_post = function(req, res) {
    photos = req.body.photos;
    id = req.body.user_id;
    PhotoModel.insertMany(photos).then(val => {
        var ids = val.map(val => val._id);
        UserModel.updateOne({ _id: id }, {
            $push: { photos_id: { $each: ids } }
        }, function(err) {
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

exports.photo_delete = function(req, res) {
    id = req.params.id;
    PhotoModel.findByIdAndRemove({ _id: id }, function(err, result) {
        if (err) {
            res.status(500).json({ Error: "Photo not found." });
        } else {
            UserModel.findByIdAndUpdate(result.user_id, { $pull: { photos_id: id } }, function(err) {
                if (err) {
                    res.status(500).json({ Error: "Error trying to delete photo from user." });
                } else {
                    res.status(200).json({ INFO: "Photo deleted" });
                }
            });
        }
    });
}