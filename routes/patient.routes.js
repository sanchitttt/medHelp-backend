const router = require('express').Router();
const { postPatient,getAllPatients } = require('../controllers/patient.controller');
const isPatientRequestBodyValid = require('../validations/patient.validation');

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

module.exports = router;