const { Schema, model } = require("mongoose");

const postSchema = Schema({
	title: {
		type: String,
		require: true,
		trim: true,
		minLength: 5,
		maxLength: 300
	},
	brief: {
		type: String,
		require: true,
		trim: true,
		index: true

	},
	body: {
		type: String,
		require: true,
		trim: true,
		index: true
	},
	thumbnail: {
		type: String,
		require: true,
		trim: true,
	},
	status: {
		type: Schema.Types.ObjectId,
		ref: "Status"
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

postSchema.index(
	{ title: "text", brief: "text", body: "text" }
)

const Post = model("Post", postSchema)

module.exports = Post