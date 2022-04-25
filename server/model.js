 const mongoose = require('mongoose');

 // User schema model
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    permission: { type: String, required: true }, // "none" or "user" or "admin"
    win_record: { type: Number, required: true },
    verifycode: { type: Number, required: true },
});

// Location schema model
const LocationSchema = mongoose.Schema({
    locationID: { type: Number, unique: true, required: true },
    name: { type: String,  required: true },
    country: { type: String,  required: true },
    latitube: { type: Number,  required: true },
    longitube: { type: Number,  required: true },
    time: { type: Date,  required: true },
    commentList: { type: [CommentSchema],  required: true },
    temp_c: { type: Number,  required: true },
    wind_kph: { type: Number,  required: true },
    wind_dir: { type: Number,  required: true },
    humidity: { type: Number,  required: true },
    precip_mm: { type: Number,  required: true },
    vis_km: { type: Number,  required: true },
});

// Comment schema model
const CommentSchema = mongoose.Schema({
    commentID: { type: Number, unique: true, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true},
})

const User = mongoose.model('User', UserSchema);
const Location = mongoose.model('Location', LocationSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = User;
module.exports = Location;
module.exports = Comment;