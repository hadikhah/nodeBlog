const yup = require('yup');

const { Validator } = require('./Validator');
const Status = require('../models/Status');

const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

function isValidFileType(fileName, fileType) {
    console.log("fileName", fileName)
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const NewPostFormValidationSchema = (statusListIds) => yup.object().shape({

    title: yup.string().required().min(4).max(300),
    status: yup.mixed().oneOf(statusListIds, "status is not valid"),
    body: yup.string().required(),
    thumbnail: yup.mixed().required()
        .test("is-valid-type", "Not a valid image type",
            value => isValidFileType(value && typeof value === "string" ? value.toLowerCase() : value.name?.toLowerCase(), "image"))

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