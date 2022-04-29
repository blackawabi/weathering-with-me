 const mongoose = require('mongoose');

 // User schema model
const UserSchema = mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    permission: { type: Boolean, require: true },
    favourite: [{ type: String }]
});

// Comment schema model
const CommentSchema = mongoose.Schema({
    //commentID: { type: Number, unique: true, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true},
});

// Location schema model
const LocationSchema = mongoose.Schema({
    //locationID: { type: Number, unique: true, required: true },
    name: { type: String, unique:true, required: true },
    country: { type: String,  required: true },
    lat: { type: Number,  required: true },
    long: { type: Number,  required: true },
    time: { type: Date,  required: true },
    commentList: { type: [CommentSchema],  required: true },
    temp_c: { type: Number,  required: true },
    wind_kph: { type: Number,  required: true },
    wind_dir: { type: String,  required: true },
    humidity: { type: Number,  required: true },
    precip_mm: { type: Number,  required: true },
    vis_km: { type: Number,  required: true },
},
{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
const Location = mongoose.model('Location', LocationSchema);
const Comment = mongoose.model('Comment', CommentSchema);

exports.User = User;
exports.Location = Location;
exports.Comment = Comment;
