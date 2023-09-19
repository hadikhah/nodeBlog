const multer = require('multer');
const Post = require('../../models/Post');
const Status = require('../../models/Status');
const { setFormSuccessMessage } = require('../../validation/Validator');
const { fileFilter } = require('../../utils/multer');
const uuid = require("uuid").v4;
const sharp = require('sharp');


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
	// won't need dest and storage cause sharp does the saving
	const upload = multer({
		limits: { fileSize: 4000000 },
		// dest: destinationFolder,
		// storage: storage, 
		fileFilter: fileFilter,
	}).single("upload" /** make sure that this has the same name with file upload input name */);

	upload(req, res, async (err) => {

		if (err)
			return res.send(err);
		else {
			if (req.file) {

				const storedImage = await compressAndSaveImage(req, res, "uploads/")

				return res.status(200).send({ "url": `/${storedImage}` });
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
 * compresses the image using sharp
 *
 * @param {*} req
 * @param {*} res
 * @param {string} [destinationFolder='uploads/']
 * @return {*} 
 */
const compressAndSaveImage = async (req, res, destinationFolder = 'uploads/') => {

	const mimeType = req.file.mimetype.split("/").pop();

	const newImageName = `${destinationFolder}${uuid()}_${Date.now()}.${mimeType}`;

	await sharp(req.file.buffer).jpeg({
		quality: 60
	})
		.toFile(`./public/${newImageName}`)
		.catch(err => console.log(err))


	return newImageName
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