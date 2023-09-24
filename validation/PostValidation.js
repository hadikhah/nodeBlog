const yup = require('yup');

const { Validator, setPreviousFormData, setPreviousFormErrors } = require('./Validator');
const Status = require('../models/Status');

const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

/**
 * checks if the uploaded file type is valid
 *
 * @param {*} fileName
 * @param {*} fileType
 * @return {*} 
 */
function isValidFileType(fileName, fileType) {
    console.log("fileName", fileName)
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

/**
 * checks if uploaded file size is valid
 *
 * @param {*} fileSize
 * @param {number} [validSize=4 * 1024 * 1024]
 * @return {*} 
 */
const isValidFileSize = (fileSize, validSize = 4 * 1024 * 1024 /**  4 MB */) => {
    return fileSize < validSize
}

const NewPostFormValidationSchema = (statusListIds) => yup.object().shape({

    title: yup.string().required().min(4).max(300),
    status: yup.mixed().oneOf(statusListIds, "status is not valid"),
    body: yup.string().required(),
    
});

const thumbnailValidation = (thumbnailFile) => {

    const errors = [];

    if (!thumbnailFile) {
        errors.push("thumbnail is required")
        return errors;
    }

    if (!isValidFileType(thumbnailFile.name, "image")) {
        errors.push(`valid image types are ${validFileExtensions.image.join(" ")}`)
    }

    if (!isValidFileSize(thumbnailFile.size)) {
        errors.push(`file size should be less than 4 MB`)
    }

    return errors

}

/**
 * register validation process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const NewPostValidation = async (req, res, next) => {

    const thumbnailErrors = thumbnailValidation(req.files?.thumbnail)

    const StatusList = await Status.find().select("_id")

    Validator(NewPostFormValidationSchema(StatusList.map(item => item._id.toString())), req, res, next, thumbnailErrors);

}


module.exports = NewPostValidation;