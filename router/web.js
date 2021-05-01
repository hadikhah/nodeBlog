const router = require('express').Router();
const {
    LoginController, RegisterController, ResetPasswordController,
    DashboardController,
    MainController,
}
    = require('./main')

//home page
router.get('/', MainController.showIndexPage)
//auth pages
router.get('/login', LoginController.showLoginForm)
router.get('/register', RegisterController.showRegisterForm)
router.get('/password/reset', ResetPasswordController.showEmailRequestForm)
//dashboard page
router.get('/dashboard', DashboardController.showDahsboardPage)
router.get("/dashboard/vue/.*/", DashboardController.showDashboardVuePage)
router.get(/.*/, DashboardController.showDashboardVuePage)


router.post('/register', RegisterController.Register)



// 404 error page
router.use((req, res) => {
    res.render('errors/404-error', { pageTitle: "ورود", layout: "layouts/base" })
})

module.exports = router