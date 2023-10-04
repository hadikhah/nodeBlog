const bcrypt = require('bcryptjs');

const User = require("../../models/User")

const hash = bcrypt.hashSync("password", 10)

console.log(hash)

const data = [
	{
		first_name: "hello",
		last_name: "demo",
		email: "demo@demo.com",
		emailVerifiedAt: new Date().toISOString(),
		password: hash,
	}
]

exports.user = () => {

	User.find({ email: data.map((item) => item.email) }).then(result => {

		if (result.length === 0)

			data.forEach(user => {
				User.create(user)
			})
	})

}