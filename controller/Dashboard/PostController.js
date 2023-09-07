const Post = require('../../models/Post');
const Status = require('../../models/Status');
const { setFormSuccessMessage } = require('../../validation/Validator');
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
 * stores the posts in db
 *
 * @param {*} req
 * @param {*} res
 *  
 */
exports.storePost = async (req, res) => {

	try {

		const post = { ...req.body, user: req.user.id }

		const newPost = await Post.create(post);

		setFormSuccessMessage(req,"Post successfully created")

		return res.redirect("back")

	} catch (error) {
		console.log(error)
	}

}

/**
 * renders the list of all posts
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.showAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate("status");

		return res.render("dashboard/post/allPosts", { pageTitle: "all posts", layout: "layouts/dashboard", posts })

	} catch (error) {
		console.log(error)
	}
}