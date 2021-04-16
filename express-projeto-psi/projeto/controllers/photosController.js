var PhotoModel = require('../schemas/photo');
var UserModel = require('../schemas/user');

exports.photo_get = function (req, res) {
    id = req.params.id;
    PhotoModel.find({ _id: id }, function (err, model) {
        if (err) {
            res.json({ Error: "Photo not found." });
        } else {
            res.json(model);
        }
    });
}

function photosGetAll(res, number_of_results) {
    PhotoModel.find().limit(number_of_results).then(results => res.json(results)).catch(err => {
        console.log(err);
        res.json({ Error: "Error while fetching photos." });
    });
}
function photosFiltered(res, filter_used, number) {
    PhotoModel.find().sort({ [filter_used]: -1 }).limit(number).then(results => res.json(results)).catch(err => {
        console.log(err);
        res.json({ Error: "Error while fetching photos." });
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
                    res.json({ Error: "Error putting like on photo" });
                } else {
                    res.json({ INFO: "Liked" });
                }
            });
        }
    });
}

exports.photo_update = function (req, res) {
    id = req.params.id;
    action = req.body.action;
    user = req.body.user;
    if (action == "like") {
        like(id, user, res)
    }
}

exports.photos_get = function (req, res) {
    filter = req.body.filter;
    number_of_results = parseInt(req.body.number_of_results);
    if (filter) {
        photosFiltered(res, filter, number_of_results);
    }
    else {
        photosGetAll(res, number_of_results);
    }
}

exports.photo_post = function (req, res) {
    data = req.body;
    id = data.user_id;
    if (data.photoBase64 === undefined || data.user_id === undefined) {
        res.json({ Error: "error while creating photo, not enough data." });
        return;
    }
    PhotoModel.create({ description: data.description, photoBase64: data.photoBase64, user_id: data.user_id }, function (err, model) {
        if (err) {
            res.json({ Error: "error while creating photo" });
        } else {
            UserModel.updateOne({ _id: id }, { $push: { photos_id: model._id } }, function (err) {
                if (err) {
                    PhotoModel.remove({ _id: model._id });
                    res.json({ Error: "error while creating photo" });
                } else {
                    res.json(model);
                }
            });
        }
    });
}

exports.photo_delete = function (req, res) {
    id = req.params.id;
    PhotoModel.findByIdAndRemove({ _id: id }, function (err, result) {
        if (err) {
            res.json({ Error: "Photo not found." });
        } else {
            UserModel.findByIdAndUpdate(result.user_id, { $pull: { photos_id: id } }, function (err) {
                if (err) {
                    res.json({ Error: "Error trying to delete photo from user." });
                } else {
                    res.json({ INFO: "Photo deleted" });
                }
            });
        }
    });
}