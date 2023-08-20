const {Signup, LogIn } = require('../Controllers/AuthController');
const {userVerification} = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

// when  post request recieve for signup
router.post('/signup', Signup);

// when post request recieved for login
router.post('/login', LogIn);


//when the verification of user access
router.post('/', userVerification)


module.exports = router 