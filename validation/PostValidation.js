const yup = require('yup');
const { Validator } = require('./Validator');

const NewPostFormValidationSchema = yup.object().shape({

    title: yup.string().required().min(4).max(300),
    status: yup.string().required().min(4).max(255),
    body: yup.string().required(),

});

/**
 * register validation process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const NewPostValidation = (req, res, next) => {

    Validator(NewPostFormValidationSchema, req, res, next);

}


module.exports = NewPostValidation;