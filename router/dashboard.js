const router = require('express').Router();
// dashboard controllers
const DashboardController = require('../controller/Dashboard/DashboardController');
const PostController = require('../controller/Dashboard/PostController');

const auth = require('../middleware/auth');

/**
 * @route
 * @desc dashboard main page 
 */
router.get('/dashboard', auth, DashboardController.showDashboardPage)
/** 
 * @route
 * @desc dashboard create post page 
 */
router.get('/dashboard/post/create', auth, PostController.createPostPage)

module.exports = router