const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true,
        trim: true
    },
    last_name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 4,
        maxlength: 255
    },
    emailVerifiedAt: {
        type: Date,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.virtual('posts', {
	ref: "Post",
	localField: "_id",
	foreignField: "user",
	justOne: false,
})

const User = mongoose.model("User", userSchema);

module.exports = User