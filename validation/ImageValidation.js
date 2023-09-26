const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'gif'] };

/** @type {*} */
const greaterThanConditionRegex = /^(gt:)(\d{1,})/g

/** @type {*} */
const lessThanConditionRegex = /^(lt:)(\d{1,})/g

/**
 * checks if the uploaded file type is valid
 *
 * @param {*} fileName
 * @param {*} fileType
 * @return {*} 
 */
const isValidFileType = (fileName, fileType) => {
	return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

/**
 * checks if uploaded file size is less than the given size
 *
 * @param {*} fileSize
 * @param {number} [validSize=4 ]
 * @return {*} 
 */
const fileShouldBeLessThan = (fileSize, validSize = 4  /**  4 MB */) => {
	return fileSize < validSize * 1024 * 1024
}

/**
 * checks if uploaded file size is greater than the given size
 *
 * @param {*} fileSize
 * @param {number} [validSize=4 ]
 * @return {*} 
 */
const fileShouldBeGreaterThan = (fileSize, validSize = 4  /**  4 MB */) => {
	return fileSize > validSize * 1024 * 1024
}


/**
 *
 *
 * @param {*} image
 * @param {string} [conditions=["required", "lt:4"]]
 * @return {*} 
 */
exports.validateImage = (imageFile, conditions = ["required", "lt:4"]) => {

	let errors = [];

	/* check for required condition */
	if (conditions.includes("required") && !imageFile)
		return errors = [...errors, "image is required"];

	/* check for file Type Validation */
	if (!isValidFileType(imageFile.name, "image"))
		errors.push(`valid image types are ${validFileExtensions.image.join(" ")}`)


	/* check for file size should be less than given size in MB */
	const ltConditionIndex = conditions.findIndex(elem => lessThanConditionRegex.exec(elem))

	if (ltConditionIndex > -1) {

		const ltConditionSize = conditions[ltConditionIndex].split(":").pop()

		if (!fileShouldBeLessThan(imageFile.size, ltConditionSize))
			errors.push(`file size should be less than ${ltConditionSize} MB`)

	}

	/* check for file size should be greater than given size in MB */
	const gtConditionIndex = conditions.findIndex(elem => greaterThanConditionRegex.exec(elem))

	if (gtConditionIndex > -1) {

		const gtConditionSize = conditions[gtConditionIndex].split(":").pop()

		if (!fileShouldBeGreaterThan(imageFile.size, gtConditionSize))
			errors.push(`file size should be greater than ${gtConditionSize} MB`)

	}

	return errors
}