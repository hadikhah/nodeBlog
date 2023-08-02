const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const { setFormSuccessMessage } = require('../../validation/Validator');

class RegisterController {

    showRegisterForm(req, res, next) {

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
    Register(req, res) {

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

}

module.exports = RegisterController;