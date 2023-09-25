const router = require('express').Router();
// dashboard controllers
const DashboardController = require('../controller/Dashboard/DashboardController');
const PostController = require('../controller/Dashboard/PostController');

const auth = require('../middleware/auth');
const { NewPostValidation, UpdatePostValidation } = require('../validation/PostValidation');

/**
 * @route
 * @get
 * @desc dashboard main page 
 */
router.get('/dashboard', auth, DashboardController.showDashboardPage)
/** 
 * @route
 * @get
 * @desc dashboard create post page 
 */
router.get('/dashboard/post/create', auth, PostController.createPostPage)
/** 
 * @route
 * @post
 * @desc dashboard Stores a post 
 */
router.post('/dashboard/post/create', auth, NewPostValidation, PostController.storePost)
/** 
 * @route
 * @get
 * @desc dashboard show all user's posts
 */
router.get('/dashboard/post/all', auth, PostController.showAllPosts)
/** 
 * @route
 * @post
 * @desc dashboard route that uploads images from ckeditor
 */
router.post('/dashboard/post/ckeditor-upload-image', auth, PostController.CKEDITORuploadImage)
/** 
 * @route
 * @get
 * @desc dashboard post edit page 
 */
router.get('/dashboard/post/edit/:id', auth, PostController.editPostPage)
/** 
 * @route
 * @post
 * @desc dashboard Stores a post 
 */
router.post('/dashboard/post/edit/:id', auth, UpdatePostValidation, PostController.updatePost)


module.exports = router