const router = require('express').Router();
const { postVerificationDetails } = require('../controllers/verification.controller');


router.post('/', postVerificationDetails);

module.exports = router;