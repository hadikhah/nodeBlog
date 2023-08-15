const router = require('express').Router();
// dashboard controllers
const DashboardController = require('../controller/Dashboard/DashboardController');
const PostController = require('../controller/Dashboard/PostController');

const auth = require('../middleware/auth');
const NewPostValidation = require('../validation/PostValidation');

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

module.exports = router