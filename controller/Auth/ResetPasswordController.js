class ResetPasswordController {
    showEmailRequestForm(req, res) {
        res.render('passwords/recovery-mail-request', { pageTitle: "بازیابی رمز عبور", layout: "layouts/base" })
    }
}

module.exports = ResetPasswordController;