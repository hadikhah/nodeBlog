/**
 *  handles the logout process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.HandleLogout = (req, res, next) => {

    req.logout(err => {
        if (err) { console.log(err); }

        return res.redirect("/")
    });


}