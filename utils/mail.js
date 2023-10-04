const nodemailer = require("nodemailer");
const ejs = require("ejs");

const makePath = require("./path");

/**
 * email schema options
 * 
 *  @type {*} 
*/
const mailOptions = {
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: process.env.MAIL_SECURE == "true" ? true : (process.env.MAIL_SECURE == "false") ? false : null,
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
	},
}

/** 
 *  email schema
 * @type {*}
 */
const transporter = nodemailer.createTransport(mailOptions);

/**
 * send email using html body format
 *
 * @param {*} receivers
 * @param {*} subject
 * @param {*} htmlBody
 * @return {*} 
 */
exports.sendMailHTML = async (receivers, subject, htmlBody) => {

	try {

		const info = await transporter.sendMail({
			from: process.env.MAIL_FROM, // sender address
			to: receivers, // list of receivers
			subject: subject, // Subject line
			html: htmlBody, // html body
		});

		return info

	} catch (error) {

		throw new Error(error);
	}

}

/**
 * send email using text only format
 *
 * @param {*} receivers
 * @param {*} subject
 * @param {*} textBody
 * @return {*} 
 */
exports.sendMailTEXT = async (receivers, subject, textBody) => {

	try {

		const info = await transporter.sendMail({
			from: process.env.MAIL_FROM, // sender address
			to: receivers, // list of receivers
			subject: subject, // Subject line
			text: textBody, // plain text body
		});

		return info

	} catch (error) {

		throw new Error(error);
	}
}


/**
 * renders ejs file with given data and returns html string
 *
 * @param {*} template
 * @param {*} data
 * @return {*} 
 */
exports.renderTemplateEjs = async (template, data = {}) => {
	try {

		const path = makePath(["views", "mails", template])

		const html = await ejs.renderFile(path, data)

		return html

	} catch (error) {

		throw new Error(error)
	}


}
