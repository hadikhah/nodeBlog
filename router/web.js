const router = require('express').Router();
// auth controllers
const LoginController = require('../controller/Auth/LoginController');
const LogoutController = require('../controller/Auth/LogoutController');
const RegisterController = require('../controller/Auth/RegisterController');
const ResetPasswordController = require('../controller/Auth/ResetPasswordController');
const { verifyEmail, resendVerificationEmail } = require('../controller/Auth/VerifyEmailController');

// main page controller 
const MainController = require('../controller/MainController');

// middleware
const auth = require('../middleware/auth');
const guest = require('../middleware/guest');

const RegisterValidation = require('../validation/RegisterValidation');


//home page
router.get('/', MainController.showIndexPage)
//auth pages
router.get('/login', guest, LoginController.showLoginForm)
router.post('/login', guest, LoginController.handleCaptcha, LoginController.handleLoginForm, LoginController.rememberMe)

router.get('/register', guest, RegisterController.showRegisterForm)
router.post('/register', guest, RegisterValidation, RegisterController.handleCaptcha, RegisterController.Register)

router.post('/logout', auth, LogoutController.HandleLogout)

router.get("/verify_email", verifyEmail)

router.get("/resend_verification_email", auth, resendVerificationEmail)

router.get('/password/reset', ResetPasswordController.showEmailRequestForm)

module.exports = router