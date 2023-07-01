const mongoose = require('mongoose');
var validator = require('validator');


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
    }
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