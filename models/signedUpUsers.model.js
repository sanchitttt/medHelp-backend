const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 40,
    },
    email: String,
    password: {
        type: String,
    },
    status: {
        type: String
    },
    image: {
        type: String,
        required: false
    },
    signupExpiresAt: {
        type: Date
    }
})

const SignedUpUsers = mongoose.model('signedUpusers', schema);


module.exports = SignedUpUsers;