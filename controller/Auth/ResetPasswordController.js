const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require("../../models/User")
const { setFormSuccessMessage, setPreviousFormErrors } = require("../../validation/Validator")
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

/**
 * sends recovery email to the given email if exists in db
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
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
 * renders the change password form page
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.showResetPasswordFormPage = (req, res) => {

    try {

        const token = req.query.token;

        return res.render('passwords/resetPasswordForm', { pageTitle: "Reset password", layout: "layouts/base", token })


    } catch (error) {

        if (error.name && error.message)
            return res.send(error.message)

        else
            return res.redirect('/500')
    }

}

/**
 * changes the password
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.resetPassword = async (req, res) => {

    try {

        const token = req.query.token;

        const tokenData = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: tokenData.data.userId })

        if (!bcrypt.compareSync(req.body.current_password, user.password)) {

            setPreviousFormErrors(req, ["password is not correct"])

            return res.redirect("back")
        }

        bcrypt.hash(req.body.new_password, 10, async (err, hash) => {

            await user.update({ password: hash })

            setFormSuccessMessage(req, "password successfully changed")

            return res.redirect("/login")

        })

    } catch (error) {

        if (error.name && error.message)
            return res.send(error.message)

        else
            return res.redirect('/500')
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