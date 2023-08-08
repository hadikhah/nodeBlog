const { Schema, model } = require("mongoose");

const statusSchema = Schema({
	key: {
		type: String,
		require: true,
		unique: true,
	},
	title: {
		type: String,
		require: true,
		unique: true,
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

const Status = model("Status", statusSchema)

module.exports = Status