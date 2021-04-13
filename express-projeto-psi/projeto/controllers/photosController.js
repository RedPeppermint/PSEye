var PhotoModel = require('../schemas/photo');
var UserModel = require('../schemas/user');

exports.photo_get = function (req, res) {
    id = req.params.id;
    PhotoModel.find({ _id: id }, function (err, model) {
        if (err) {
            res.json({ Error: "Photo not found." });
        }
        else {
            res.json(model);
        }
    });
}

exports.photo_post = function (req, res) {
    data = req.body;
    if (data.description === undefined || data.photoBase64 === undefined || data.photo_id === undefined) {
        res.json({ Error: "error while creating photo, not enough data." });
        return;
    }
    PhotoModel.create({ description: data.description, photoBase64: data.photoBase64, user_id: data.photo_id }, function (err, model) {
        if (err) {
            res.json({ Error: "error while creating photo" });
        }
        else {
            res.json({ id: model._id, name: model.name, pet_id: model.pet_id })
        }
    });
}

exports.photo_delete = function (req, res) {
    PhotoModel.remove({ _id: id }, function (err) {
        if (err) {
            res.json({ Error: "Photo not found." });
        }
        else {
            res.json({ INFO: "Photo deleted" });
        }
    });
}