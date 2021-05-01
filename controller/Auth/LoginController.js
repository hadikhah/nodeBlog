class LoginController {
    loginSchema = {
        username: {
            type: "email",

        },
        password: {
            type: "string", min: 6
        }
    }

    showLoginForm(req, res) {
        res.render('login', { pageTitle: "ورود", layout: "layouts/base" })
    }

}

module.exports = LoginController;