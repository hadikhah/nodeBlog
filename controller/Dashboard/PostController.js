
/**
 * renders the create post page of user dashboard
 *
 * @param {*} req
 * @param {*} res
 *  
 */
exports.createPostPage = (req, res) => {

	return res.render("dashboard/post/createPost", { pageTitle: "create post", layout: "layouts/dashboard" })

}