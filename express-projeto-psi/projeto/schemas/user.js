//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    password: String,
    photos_id: { type: Schema.Types.Array, default: [] },
    favourites: { type: Schema.Types.Array, default: [] },
    faves: { type: Schema.Types, Array, default: [] }
});

UserSchema.virtual("url").get(function () {
    return "/users/" + this._id;
});

module.exports = mongoose.model('User', UserSchema)