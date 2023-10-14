const yup = require('yup');
const { Validator } = require('./Validator');

const NewPasswordFormValidationSchema = yup.object().shape({

	current_password: yup.string().required().min(6).max(255),
	new_password: yup.string().required().min(6).max(255),
	confirm_password: yup.string().required().oneOf([yup.ref("new_password"), null], "passwords do not match"),

});

/**
 * NewPassword validation process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const NewPasswordFormValidation = (req, res, next) => {

	Validator(NewPasswordFormValidationSchema, req, res, next);

}


module.exports = NewPasswordFormValidation;