const mongoose = require('mongoose');
var validator = require('validator');

const verificationSchema = new mongoose.Schema({
    requested: {
        type: Boolean,
        default: false
    },
    requestedAt: {
        type: Date
    }
})

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
    verification: verificationSchema
})

const User = mongoose.model('users', schema);

// schema.pre('save', async function someFunction(next) {
//     if (validator.isEmail(this.email)) {
//         next();
//     }
//     else {
//         throw new Error('Invalid email');
//     }
// })

module.exports = User;