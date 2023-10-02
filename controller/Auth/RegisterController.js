const bcrypt = require('bcryptjs');
const { verify } = require('hcaptcha');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { setFormSuccessMessage, setPreviousFormErrors } = require('../../validation/Validator');
const { renderTemplateEjs, sendMailHTML } = require('../../utils/mail');

/**
 * renders the sign up page
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} 
 * @memberof RegisterController
 */
exports.showRegisterForm = (req, res, next) => {

    return res.render('auth/register', { pageTitle: "Sign up", layout: "layouts/base" })

}


/**
 * renders the sign up page
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 * @memberof RegisterController
 */
exports.Register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {

        req.body.password = hash

        const user = new User(req.body);

        user.save().then(async (result) => {

            await sendUserVerificationEmail(result)

            setFormSuccessMessage(req, "Sign up was successful. validation email has sent")

            req.logIn(user, err => {
                if (err) return res.redirect("/500")

                return res.redirect("/")
            })


        }).catch(err => {

            console.log("hello this is error", err)

            res.redirect("/404")
        });
    })

}

/**
 * handles hcaptcha check box in login form
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.handleCaptcha = (req, res, next) => {

    const token = req.body["h-captcha-response"];
    const secret = res.locals.env().HCAPTCHA_SECRET;

    verify(secret, token)
        .then((data) => {
            if (data.success === true) {
                console.log('success! captcha', data);

                return next()

            } else {
                console.log('captcha failed');

                setPreviousFormErrors(req, ["invalid captcha"])

                return res.redirect('back')
            }
        })
        .catch(console.error);

}

/**
 * creates email verification url 
 *
 * @param {*} userId
 * @return {*} 
 */
const createUserVerificationUrl = async (userId) => {

    const token = jwt.sign({

        // exp: Math.floor(Date.now() / 1000) + (60 * 5),// 5 min
        data: {userId}

    },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 5 }
    )


    return `${process.env.SITE_URL}/verify_email?token=${token}`;
}

/**
 * sends verification email to given user
 *
 * @param {*} user
 * @return {*} 
 */
const sendUserVerificationEmail = async (user) => {

    try {

        const verificationUrl = await createUserVerificationUrl(user._id)

        const html = await renderTemplateEjs("verifyEmail.ejs", { verificationUrl, user })

        await sendMailHTML(user.email, "EMAIL VERIFICATION", html)

    } catch (error) {

        throw new Error(error)
    }

}