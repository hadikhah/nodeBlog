const Post = require("../../models/Post");
const Status = require("../../models/Status");
const { truncate } = require('../../utils/helpers');


/**
 * returns all latest public posts page with search
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} 
 */
exports.allPosts = async (req, res, next) => {

	const perPage = parseInt(req.query.perPage ?? 10);

	const page = parseInt(req.query.page ?? 1);

	try {
		const publicStatus = await Status.findOne({ key: "public" }).exec()

		let find = { status: publicStatus._id }

		if (req.query?.search)
			find = { ...find, $text: { $search: req.query?.search } }

		const posts = await Post.find(find)
			.skip(perPage * (page - 1))
			.limit(perPage)
			.sort({
				createdAt: 'desc'
			}).populate("user").exec();


		const allPostsCount = await Post.countDocuments(find)

		const totalPages = allPostsCount % perPage ? (Math.floor((allPostsCount / perPage) + 1)) : (Math.floor(allPostsCount / perPage))

		const { page: _, ...query } = req.query

		return res.render("blog/posts", { pageTitle: "all posts", layout: "layouts/main", posts, currentPage: page, perPage, allPostsCount, totalPages, query, truncate })

	} catch (err) {
		next(err)
	}
}

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