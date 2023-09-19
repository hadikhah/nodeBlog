const multer = require('multer');
const Post = require('../../models/Post');
const Status = require('../../models/Status');
const { setFormSuccessMessage } = require('../../validation/Validator');
const { storage, fileFilter } = require('../../utils/multer');

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

		setFormSuccessMessage(req, "Post successfully created")

		return res.redirect("back")

	} catch (error) {
		console.log(error)
	}

}

/**
 * ckeditor upload image method 
 *
 * @param {*} req
 * @param {*} res
 */
exports.CKEDITORuploadImage = (req, res) => {

	const destinationFolder = "uploads/"
	// multer function for upload 
	const upload = multer({
		limits: { fileSize: 4000000 },
		dest: destinationFolder,
		storage: storage,
		fileFilter: fileFilter,
	}).single("upload" /** make sure that this has the same name with file upload input name */);

	upload(req, res, (err) => {

		if (err)
			return res.send(err);
		else {
			if (req.file) {
				return res.status(200).send({
					"url": `/${destinationFolder}${req.file.filename}`
				});

			}
			else
				return res.send({
					"error": {
						"message": "an error happened"
					}
				});
		}
	});
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