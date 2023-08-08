const { status } = require("./seeds/status")
const { user } = require("./seeds/user")

exports.run = () => {

	status()

	if (process.env.NODE_ENV !== "production") {
		user()
	}

}