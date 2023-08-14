const Post = require('../../models/Post');
const Status = require('../../models/Status');
/**
 * renders the create post page of user dashboard
 *
 * @param {*} req
 * @param {*} res
 *  
 */
exports.createPostPage = async (req, res) => {
	try {

		const statusList = await Status.find()

		return res.render("dashboard/post/createPost", { pageTitle: "create post", layout: "layouts/dashboard", statusList })

	} catch (error) {
		console.log(error)
	}



}

/**
 * renders the create post page of user dashboard
 *
 * @param {*} req
 * @param {*} res
 *  
 */
exports.storePost = async (req, res) => {

	try {

		const post = { ...req.body, user: req.user.id }

		const newPost = await Post.create(post);

		return res.redirect("back")

	} catch (error) {
		console.log(error)
	}


}