const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const { sendUserVerificationEmail } = require('./RegisterController');

exports.verifyEmail = async (req, res) => {
	try {

		const token = req.query.token;

		const tokenData = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findOneAndUpdate({ _id: tokenData.data.userId }, {
			emailVerifiedAt: new Date().toISOString()
		})

		return res.send(`${user.email} successfully verified`)

	} catch (error) {

		if (error.name && error.message)
			return res.send(error.message)

		else
			return res.redirect('/500')
	}


}

/**
 * resend verification email to the logged in user
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} 
 */
exports.resendVerificationEmail = async (req, res, next) => {

	try {
		await sendUserVerificationEmail(req.user)

		res.redirect("back")

	} catch (error) {

		return next(error)
	}

}