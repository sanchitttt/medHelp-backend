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
})

function isPatientRequestBodyValid(payload) {
    return patientRequestBody.validate(payload).error;
}

module.exports = isPatientRequestBodyValid;