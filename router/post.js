const router = require('express').Router();

const PostController = require('../controller/Post/PostController');

/** 
 * @route
 * @get
 * @desc dashboard post edit page 
 */
router.get('/post/:id', PostController.showPost)



module.exports = router