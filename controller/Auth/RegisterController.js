const bcrypt = require('bcryptjs');
const { verify } = require('hcaptcha');

const User = require('../../models/User');
const { setFormSuccessMessage, setPreviousFormErrors } = require('../../validation/Validator');

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
exports.Register = (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {

        req.body.password = hash

        const user = new User(req.body);

        user.save().then(() => {

            setFormSuccessMessage(req, "Sign up was successful")

            return res.redirect("/")

        }).catch(err => {

            console.log("hello this is error", err)

            redirect("/404")
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