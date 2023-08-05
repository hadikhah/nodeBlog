module.exports = auth = (req, res, next) => {
    if (req.isAuthenticated())
        return next()

    req.session.redirectsTo = req.url

    req.flash("error", "you are not logged in")

    return res.redirect("/login")
}