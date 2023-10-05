const yup = require('yup');
const { Validator } = require('./Validator');

const ResetPasswordFormValidationSchema = yup.object().shape({

    email: yup.string().email().required(),

});

/**
 * reset password form validation process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const ResetPasswordValidation = (req, res, next) => {

    return Validator(ResetPasswordFormValidationSchema, req, res, next);

}


module.exports = ResetPasswordValidation;