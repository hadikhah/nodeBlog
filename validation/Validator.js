/**
*   handles the validation process of the given schema
*
* @param {*} req
* @param {*} res
* @param {*} next
* @return {*} 
*/
const Validator = (schema, req, res, next, custom_errors = []) => {

    // initiates the validation process 
    // abort early false is for the validation to show all of the errors
    // and does not throw error on the first error
    // strip unknown : removes the fields from body that aren't specified in the schema
    schema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((result) => {
            // setFormSuccessMessage(req, "form validation was successful")

            console.log(custom_errors.length)
            if (custom_errors.length > 0) {
                setPreviousFormErrors(req, custom_errors)
                setPreviousFormData(req, req.body)

                return res.redirect("back")
            }

            next();
        })
        .catch(err => {

            setPreviousFormErrors(req, custom_errors.concat(err?.errors))
            setPreviousFormData(req, req.body)

            return res.redirect("back")
        });
};

/**
 * set success flash message
 *
 * @param {*} req
 * @param {*} Message
 */
const setFormSuccessMessage = (req, Message) => {

    req.flash("form_success", Message)

}

/**
 *  stringifies the form body and sets a flash value of it
 *
 * @param {*} req
 * @param {*} body
 */
const setPreviousFormData = (req, body) => {
    req.flash('form_body', JSON.stringify(body))

}

/**
 *  sets the form errors in error flash message 
 *
 * @param {*} req
 * @param {*} errors
 */
const setPreviousFormErrors = (req, errors) => {
    req.flash('form_error', errors)

}

/**
 * checks the the given model if the given field has given data or not (checks for uniqueness of the value)
 *
 * @param {*} Model
 * @param {*} [findData={ field: data }]
 * @param {*} req
 * @param {*} [field_name=null]
 * @param {*} [custom_message=null]
 * @return {*} 
 */
const checkUnique = (Model, findData = { field: data }, req, field_name = null, custom_message = null) => {
    return new Promise((resolve, reject) => {

        // checking the model for the data
        Model.findOne(findData).then((result) => {

            // no result means that given data has not stored before in the database
            // so it means it will be unique
            if (result === null)
                // then
                return resolve(req)


            const errors = [custom_message ?? `this ${field_name ?? field} has been taken`]

            setPreviousFormData(req, req.body)
            setPreviousFormErrors(req, errors)

            // catch 
            return reject(errors, req)

        })
            .catch(err => {
                console.log(err)
            })
    })
}

module.exports = { Validator, setPreviousFormData, setPreviousFormErrors, setFormSuccessMessage, checkUnique }