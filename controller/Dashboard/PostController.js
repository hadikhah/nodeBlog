const multer = require('multer');
const fs = require('fs');
const uuid = require("uuid").v4;
const sharp = require('sharp');

const Post = require('../../models/Post');
const Status = require('../../models/Status');
const makePath = require('../../utils/path');
const { setFormSuccessMessage } = require('../../validation/Validator');
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
		const post = await Post.findById(req.params.id)

		const oldThumbnail = makePath(["public"]) + post.thumbnail

		const newPost = { ...req.body, user: req.user.id }

		if (req.files?.thumbnail) {

			let thumbnail;

			if (req.files.thumbnail.mimetype == "image/gif")
				thumbnail = await saveImage(req.files.thumbnail, "uploads/thumbnails/")
			else
				thumbnail = await compressAndSaveJpeg(req.files.thumbnail.data, "uploads/thumbnails/")

			if (fs.existsSync(oldThumbnail))
				fs.unlinkSync(oldThumbnail);

			newPost.thumbnail = thumbnail
		}

		await post.update(newPost)

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

		let thumbnail;

		if (req.files.thumbnail.mimetype == "image/gif")
			thumbnail = await saveImage(req.files.thumbnail, "uploads/thumbnails/")
		else
			thumbnail = await compressAndSaveJpeg(req.files.thumbnail.data, "uploads/thumbnails/")

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

		const validationErrors = validateImage(req.files.upload, ["required", "lt:4"])

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
 *	save without compressing
 *
 * @param {*} file
 * @param {string} [destination="uploads/"]
 */
const saveImage = async (file, destinationFolder = "uploads/") => {

	try {

		const uploadPath = makePath(["public", ...destinationFolder.split("/")]);

		const newImageName = `${uuid()}_${Date.now()}.${file.mimetype.split("/").pop()}`

		await file.mv(`${uploadPath}/${newImageName}`)

		console.log("uploads", uploadPath, newImageName, `${destinationFolder}${newImageName}`)

		return `/${destinationFolder}${newImageName}`

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

	const perPage = parseInt(req.query.perPage ?? 10);

	const page = parseInt(req.query.page ?? 1);

	try {
		let find = { user: req.user._id };

		if (req.query?.search)
			find = { ...find, $text: { $search: req.query?.search } }
		// find = { ...find, "$or": [{ "title": { $search: req.query?.search } }, { "brief": { $search: req.query?.search } }, { "body": { $search: req.query?.search } }] }

		const dbQuery = Post.find(find)
			.limit(perPage)
			.skip(perPage * (page - 1))
			.sort({
				createdAt: 'desc'
			});

		const posts = await dbQuery.populate("status");

		const allPostsCount = await dbQuery.countDocuments()

		const totalPages = allPostsCount % perPage ? (Math.floor((allPostsCount / perPage) + 1)) : (Math.floor(allPostsCount / perPage))

		const { page: _, ...query } = req.query

		return res.render("dashboard/post/allPosts", { pageTitle: "all posts", layout: "layouts/dashboard", posts, currentPage: page, perPage, allPostsCount, totalPages, query })

	} catch (error) {
		console.log(error)
	}
}