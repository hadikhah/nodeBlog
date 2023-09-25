const multer = require('multer');
const fs = require('fs');

const Post = require('../../models/Post');
const Status = require('../../models/Status');
const { setFormSuccessMessage, setPreviousFormErrors } = require('../../validation/Validator');
const { fileFilter } = require('../../utils/multer');
const uuid = require("uuid").v4;
const sharp = require('sharp');
const makePath = require('../../utils/path');
const { validateImage } = require('../../validation/ImageValidation');

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
 * renders the edit post page of user dashboard
 *
 * @param {*} req
 * @param {*} res
 *  
 */
exports.editPostPage = async (req, res) => {

	try {
		const post = await Post.findOne({ _id: req.params.id })

		const statusList = await Status.find()

		return res.render("dashboard/post/editPost", { pageTitle: "post Edits", layout: "layouts/dashboard", statusList, post })

	} catch (error) {
		console.log(error)
		if (error.name == "CastError")
			return res.redirect("/404")
	}

}

/**
 * updates the given post
 *
 * @param {*} req
 * @param {*} res
 *  
 */
exports.updatePost = async (req, res) => {

	try {

		const post = { ...req.body, user: req.user.id }

		if (req.files?.thumbnail) {
			const thumbnail = await compressAndSaveJpeg(req.files.thumbnail.data)
			post.thumbnail = thumbnail
		}

		await Post.findByIdAndUpdate({ _id: req.params.id }, post)

		setFormSuccessMessage(req, "Post successfully updated")

		return res.redirect("back")

	} catch (error) {
		console.log(error)
		if (error.name == "CastError")
			return res.redirect("/404")
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
		const thumbnail = await compressAndSaveJpeg(req.files.thumbnail.data)

		// if (!thumbnail) return res.redirect("back")

		const post = { ...req.body, user: req.user.id, thumbnail }

		await Post.create(post);

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
exports.CKEDITORuploadImage = async (req, res) => {
	try {
		const destinationFolder = "uploads/postImages"

		const validationErrors = validateImage(req.files.upload, ["required", "lt:0.2"])

		if (validationErrors.length)
			return res.status(422).send({ "error": { "message": validationErrors.join("\n") } })

		const storedImage = await compressAndSaveJpeg(req.files.upload.data, destinationFolder)

		return res.status(200).send({ "url": storedImage });

	}
	catch (error) {

		console.log(error)

		return res.status(500).send({
			"error": {
				"message": "an error happened"
			}
		});
	}

}


/**
 * compresses the image as jpeg format using sharp
 *
 * @param {*} buffer
 * @param {string} [destinationFolder='uploads/']
 * @return {*} 
 */
const compressAndSaveJpeg = async (buffer, destinationFolder = 'uploads/') => {

	const uploadPath = makePath(["public", ...destinationFolder.split("/")]);
	// make destination Folder path if not exists

	if (!fs.existsSync(uploadPath)) {
		fs.mkdirSync(uploadPath, { recursive: true });
	}

	const newImageName = `${destinationFolder}${uuid()}_${Date.now()}.jpeg`;

	await sharp(buffer).jpeg({
		quality: 60
	})
		.toFile(`./public/${newImageName}`)
		.catch(err => console.log(err))

	return `/${newImageName}`

}

/**
 * renders the list of all posts
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.showAllPosts = async (req, res) => {

	const perPage = parseInt(req.query.perPage ?? 10);

	const page = parseInt(req.query.page ?? 1);

	try {
		const posts = await Post.find()
			.limit(perPage)
			.skip(perPage * (page - 1))
			.sort({
				createdAt: 'desc'
			})
			.populate("status");

		const allPostsCount = await Post.count()

		const totalPages = allPostsCount % perPage ? (Math.floor((allPostsCount / perPage) + 1)) : (Math.floor(allPostsCount / perPage))

		const { page: _, ...query } = req.query

		return res.render("dashboard/post/allPosts", { pageTitle: "all posts", layout: "layouts/dashboard", posts, currentPage: page, perPage, allPostsCount, totalPages, query })

	} catch (error) {
		console.log(error)
	}
}