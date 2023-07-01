const router = require('express').Router();
const { postLogin, postSignup, getEncodedLinkOfSignupUsers } = require('../controllers/auth.controller');

router.get('/signupusers/:encodedLink',getEncodedLinkOfSignupUsers)
router.post('/login', postLogin);
router.post('/signup', postSignup);

module.exports = router;