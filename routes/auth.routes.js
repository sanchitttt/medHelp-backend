const router = require('express').Router();
const { getLogin, postLogin } = require('../controllers/auth.controller');

router.get('/login', getLogin);
router.post('/signup', postSignup);

module.exports = router;