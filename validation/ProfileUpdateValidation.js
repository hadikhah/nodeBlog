const yup = require('yup');
const { Validator } = require('./Validator');

const ProfileUpdateValidationSchema = yup.object().shape({

	first_name: yup.string().required().min(4).max(255),
	last_name: yup.string().required().min(4).max(255),

});

/**
 * NewPassword validation process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const ProfileUpdateValidation = (req, res, next) => {

	Validator(ProfileUpdateValidationSchema, req, res, next);

}


module.exports = ProfileUpdateValidation;