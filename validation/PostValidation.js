const yup = require('yup');

const { Validator } = require('./Validator');
const Status = require('../models/Status');

const NewPostFormValidationSchema = (statusListIds) => yup.object().shape({

    title: yup.string().required().min(4).max(300),
    status: yup.mixed().oneOf(statusListIds, "status is not valid"),
    body: yup.string().required(),

});

/**
 * register validation process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const NewPostValidation = async (req, res, next) => {

    const StatusList = await Status.find().select("_id")

    Validator(NewPostFormValidationSchema(StatusList.map(item => item._id.toString())), req, res, next);

}


module.exports = NewPostValidation;