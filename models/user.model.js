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
        maxLength: 30,
    },
    status: {
        enum: ['verified', 'unverified']
    }
})

schema.pre('save', async function someFunction(this, next) {
    if (validator.isEmail(this.email)) {
        next();
    }
    else {
        throw new Error('Invalid email');
    }
})