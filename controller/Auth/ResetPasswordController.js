const jwt = require('jsonwebtoken');

const User = require("../../models/User")
const { setFormSuccessMessage } = require("../../validation/Validator")
const { renderTemplateEjs, sendMailHTML } = require('../../utils/mail');


/**
 * returns account recovery page
 *
 * @param {*} req
 * @param {*} res
 */
exports.showEmailRequestForm = (req, res) => {
    return res.render('passwords/recovery-mail-request', { pageTitle: "Reset password", layout: "layouts/base" })
}

exports.sendResetPasswordEmail = async (req, res) => {

    try {

        setFormSuccessMessage(req, "recovery email sent successfully")

        const user = await User.findOne({ email: req.body.email }).lean()
        // check if user exists
        if (!user)
            return res.redirect(back)
        // check if user has verified email
        if (!user.emailVerifiedAt)
            return res.redirect(back)

        await sendUserResetPasswordEmail(user)

        return res.redirect("back")

    } catch (error) {

        console.log(error)

        return res.redirect("back")
    }


}


/**
 * creates reset password  url 
 *
 * @param {*} userId
 * @return {*} 
 */
const createUserResetPasswordUrl = async (userId) => {

    const token = jwt.sign({

        // exp: Math.floor(Date.now() / 1000) + (60 * 5),// 5 min
        data: { userId }

    },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 5 }
    )



    return `${process.env.SITE_URL}/password/reset/form?token=${token}`;
}


/**
 * sends reset password email to given user
 *
 * @param {*} user
 * @return {*} 
 */
const sendUserResetPasswordEmail = async (user) => {

    try {

        const resetPasswordUrl = await createUserResetPasswordUrl(user._id)

        const html = await renderTemplateEjs("resetPassword.ejs", { resetPasswordUrl, user })

        await sendMailHTML(user.email, "Reset password", html)

    } catch (error) {

        throw new Error(error)
    }

}