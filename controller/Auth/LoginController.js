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

    successRedirect: req.session.redirectsTo ?? "/",
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
