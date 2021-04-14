var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema(
    {
        _id: { type: String, required: true },
        date: { type: Date, required: true }
        //likes
        //user
    }
);

/*
para quando formos buscar photos
PhotoSchema.virtual('url').get(function () {
    return
})*/

module.exports = mongoose.model('Photo', PhotoSchema);
