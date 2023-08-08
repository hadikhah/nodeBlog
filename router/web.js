const router = require('express').Router();
// auth controllers
const LoginController = require('../controller/Auth/LoginController');
const LogoutController = require('../controller/Auth/LogoutController');
const RegisterController = require('../controller/Auth/RegisterController');
const ResetPasswordController = require('../controller/Auth/ResetPasswordController');

// main page controller 
const MainController = require('../controller/MainController');

// dashboard controllers
const DashboardController = require('../controller/Dashboard/DashboardController');

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

router.get('/password/reset', ResetPasswordController.showEmailRequestForm)
//dashboard page
router.get('/dashboard', auth, DashboardController.showDashboardPage)
// router.get("/dashboard/vue/.*/", DashboardController.showDashboardVuePage)



// 404 error page
router.use((req, res) => {
    res.render('errors/404-error', { pageTitle: "ورود", layout: "layouts/base" })
})

module.exports = router