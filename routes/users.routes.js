const router = require('express').Router();
const { getUserDetails } = require('../controllers/user.controller');


router.get('/', getUserDetails);

module.exports = router;