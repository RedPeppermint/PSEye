var Photo = require('../models/photo');
var mongoose = require('mongoose');
var PhotoSchema = mongoose.model('Photo', Photo.PhotoSchema);

exports.upload = function (req, res) {
    console.log("TODO function photo_controller: upload");
    res.send("TODO");
};
