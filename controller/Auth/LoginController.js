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
        res.render('auth/login', { pageTitle: "Sign in", layout: "layouts/base" })
    }

}

module.exports = LoginController;