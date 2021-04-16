var PhotoModel = require('../schemas/photo');
var UserModel = require('../schemas/user');

exports.photo_get = function(req, res) {
    id = req.params.id;
    PhotoModel.find({ _id: id }, function(err, model) {
        if (err) {
            res.json({ Error: "Photo not found." });
        } else {
            res.json(model);
        }
    });
}

exports.photo_post = function(req, res) {
    data = req.body;
    id = data.user_id;
    if (data.photoBase64 === undefined || data.user_id === undefined) {
        res.json({ Error: "error while creating photo, not enough data." });
        return;
    }
    PhotoModel.create({ description: data.description, photoBase64: data.photoBase64, user_id: data.photo_id }, function(err, model) {
        if (err) {
            res.json({ Error: "error while creating photo" });
        } else {
            UserModel.updateOne({ _id: id }, { $push: { photos_id: model._id } }, function(err) {
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

exports.photo_delete = function(req, res) {
    id = req.params.id;
    PhotoModel.findByIdAndRemove({ _id: id }, function(err, result) {
        if (err) {
            res.json({ Error: "Photo not found." });
        } else {
            UserModel.findByIdAndUpdate(result.user_id, { $pull: { photos_id: id } }, function(err) {
                if (err) {
                    res.json({ Error: "Error trying to delete photo from user." });
                } else {
                    res.json({ INFO: "Photo deleted" });
                }
            });
        }
    });
}