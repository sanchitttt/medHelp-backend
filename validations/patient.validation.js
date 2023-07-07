const Joi = require('joi');

const patientRequestBody = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    contact: Joi.string().max(10).required().min(10),
    diagnosis: Joi.string(),
    surgery: Joi.string(),
    dateOfSurgery: Joi.date(),
    tags: Joi.array().items(Joi.string()),
    assignedDoctor: Joi.string(),
    images: Joi.array().items(Joi.string())
});

const patientUpdateRequestBody = Joi.object().keys({
    __v: Joi.number(),
    _id: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    contact: Joi.string().max(10).required().min(10),
    diagnosis: Joi.string(),
    surgery: Joi.string(),
    dateOfSurgery: Joi.date(),
    tags: Joi.array().items(Joi.string()),
    assignedDoctor: Joi.string(),
    images: Joi.array().items(Joi.string()),
    imagesToBeDeleted: Joi.array().items(Joi.string()),
    newlyAddedImages: Joi.array().items(Joi.string())
})

function isPatientRequestBodyValid(payload) {
    return patientRequestBody.validate(payload).error;
}

function isPatientUpdateRequestBodyValid(payload) {
    return patientUpdateRequestBody.validate(payload).error;
}

module.exports = { isPatientRequestBodyValid, isPatientUpdateRequestBodyValid };