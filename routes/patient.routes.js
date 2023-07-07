const router = require('express').Router();
const { postPatient, getAllPatients, getPatientById, postPatientById } = require('../controllers/patient.controller');
const { isPatientRequestBodyValid, isPatientUpdateRequestBodyValid } = require('../validations/patient.validation');

router.post('/new', (req, res, next) => {
    req.body = {
        ...req.body,
        age: parseInt(req.body.age),
        tags: req.body.tags,
        images: req.body.images
    }
    const errors = isPatientRequestBodyValid(req.body);
    if (!errors) {
        next();
    } else {
        res.json(errors.details)
    }
}, postPatient)

router.get('/', getAllPatients)

router.get('/:patientId', getPatientById)

router.post('/:patientId', (req, res, next) => {
    req.body = {
        ...req.body,
        age: parseInt(req.body.age),
    }
    const errors = isPatientUpdateRequestBodyValid(req.body);
    if (!errors) next()
    else res.json(errors.details);
}, postPatientById)

module.exports = router;