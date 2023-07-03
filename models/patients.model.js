const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    contact: {
        type: String,
        maxLength: 10
    },
    diagnosis: {
        type: String,
    },
    surgery: String,
    dateOfSurgery: Date,
    tags: [String],
    assignedDoctor: String,
    images: {
        type: [String],
        default: []
    }
});

const Patients = mongoose.model('patients', schema);

module.exports = Patients;