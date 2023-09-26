const yup = require('yup');

const { Validator, setPreviousFormData, setPreviousFormErrors } = require('./Validator');
const Status = require('../models/Status');

const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'gif'] };

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
    brief: yup.string().required().min(4).max(700),
    body: yup.string().required(),

});

/**
 * checks if the uploaded thumbnail is valid for new post
 *
 * @param {*} thumbnailFile
 * @return {*} 
 */
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
 * new post validation process
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.NewPostValidation = async (req, res, next) => {

    const thumbnailErrors = thumbnailValidation(req.files?.thumbnail)

    const StatusList = await Status.find().select("_id")

    Validator(NewPostFormValidationSchema(StatusList.map(item => item._id.toString())), req, res, next, thumbnailErrors);

}

/**
 * checks if the uploaded thumbnail is valid for updating a post
 *
 * @param {*} thumbnailFile
 * @return {*} 
 */
const updateThumbnailValidation = (thumbnailFile) => {

    const errors = [];

    if (!thumbnailFile) {
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
 * update post validation
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.UpdatePostValidation = async (req, res, next) => {

    const thumbnailErrors = updateThumbnailValidation(req.files?.thumbnail)

    const StatusList = await Status.find().select("_id")

    Validator(NewPostFormValidationSchema(StatusList.map(item => item._id.toString())), req, res, next, thumbnailErrors);

}
