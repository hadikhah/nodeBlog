const router = require('express').Router();
const LogoutController = require('../controller/Auth/LogoutController');
const auth = require('../middleware/auth');
const guest = require('../middleware/guest');
// const RegisterValidation = require('../validation/RegisterValidation');
const {
    LoginController, RegisterController, ResetPasswordController,
    DashboardController,
    MainController, RegisterValidation
}
    = require('./main')

//home page
router.get('/', MainController.showIndexPage)
//auth pages
router.get('/login', guest, LoginController.showLoginForm)
router.post('/login', guest, LoginController.handleLoginForm)

router.get('/register', guest, RegisterController.showRegisterForm)
router.post('/register', guest, RegisterValidation, RegisterController.Register)

router.post('/logout', auth, LogoutController.HandleLogout)

router.get('/password/reset', ResetPasswordController.showEmailRequestForm)
//dashboard page
router.get('/dashboard', auth, DashboardController.showDahsboardPage)
router.get("/dashboard/vue/.*/", DashboardController.showDashboardVuePage)
router.get(/.*/, DashboardController.showDashboardVuePage)



// 404 error page
router.use((req, res) => {
    res.render('errors/404-error', { pageTitle: "ورود", layout: "layouts/base" })
})

module.exports = router