/**
 * shortens the given text by given length and adds 
 * "etc" mark at the end of the text
 *
 * @param {*} string
 * @param {*} length
 */
exports.truncate = (string, length) => {

	if (string.length > length && string.length > 0) {
		
		let newString = string + " "

		newString = string.substring(0, length)

		newString = string.substring(0, newString.lastIndexOf(" "))

		newString = newString.length > 0 ? newString : string.substring(0, len)

		return newString = newString + " ..."
	}

	return string
}
