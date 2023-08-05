const passport = require("passport");

class LoginController {

    showLoginForm(req, res) {
        res.render('auth/login', { pageTitle: "Sign in", layout: "layouts/base" })
    }

    handleLoginForm(req, res, next) {
        const authenticate = passport.authenticate("local", {
            successRedirect: req.session.redirectsTo ?? "/",
            failureRedirect: "/login",
            failureFlash: true
        })

        authenticate(req, res, next)
    }

}

module.exports = LoginController;