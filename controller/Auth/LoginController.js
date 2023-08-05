const passport = require("passport");


/**
 * showing login page
 *
 * @param {*} req
 * @param {*} res
 */
exports.showLoginForm = (req, res) => {

    res.render('auth/login', { pageTitle: "Sign in", layout: "layouts/base" })

}

/**
 * returns the authentication process function of passport
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.authenticate = (req, res, next) => passport.authenticate("local", {

    failureRedirect: "/login",
    failureFlash: true

})(req, res, next)



/**
 * handles the login form
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.handleLoginForm = (req, res, next) => {

    this.authenticate(req, res, next)

}

/**
 * handles remember me checkbox of login form
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.rememberMe = (req, res) => {

    if (req.body.remember)
        req.session.cookie.originalMaxAge = 7 * 24 * 60 * 60 * 1000 //one week

    else
        req.session.cookie.expires = false

    return res.redirect(req.session.redirectsTo ?? "/")
}
