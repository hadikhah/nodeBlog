/**
 * returns account recovery page
 *
 * @param {*} req
 * @param {*} res
 */
exports.showEmailRequestForm = (req, res) => {
    res.render('passwords/recovery-mail-request', { pageTitle: "بازیابی رمز عبور", layout: "layouts/base" })
}
