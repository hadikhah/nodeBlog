const jwt = require("jsonwebtoken");
const User = require("../../models/User");


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