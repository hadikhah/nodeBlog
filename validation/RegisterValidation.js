const yup = require('yup');
const { Validator, checkUnique, } = require('./Validator');
const User = require('../models/User');

const RegisterFormValidationSchema = yup.object().shape({

    first_name: yup.string().required().min(4).max(255),
    last_name: yup.string().required().min(4).max(255),
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(255),
    confirm_password: yup.string().required().oneOf([yup.ref("password"), null]),

});

/**
 * register validation process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const RegisterValidation = (req, res, next) => {

    checkUnique(User, { email: req.body.email }, req, "email").then(res => {

        Validator(RegisterFormValidationSchema, req, res, next);

    }).catch(() => {

        return res.redirect("back")

    })

}


module.exports = RegisterValidation;