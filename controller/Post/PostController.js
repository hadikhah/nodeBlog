const Post = require("../../models/Post")

/**
 * renders the post by given id
 *
 * @param {*} req
 * @param {*} res
 */
exports.showPost = async (req, res) => {

	try {
		const post = await Post.findOne({ _id: req.params.id }).populate("status").populate("user").lean()

		if (post.status.key != "public")
			return res.redirect("/404")

		return res.render("blog/post", { pageTitle: "some title", post })

	} catch (error) {

		console.log(error)

	}

}