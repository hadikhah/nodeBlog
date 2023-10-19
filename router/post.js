const router = require('express').Router();

const PostController = require('../controller/Post/PostController');

/** 
 * @route
 * @get
 * @desc show all latest posts with search and patination 
 */
router.get('/posts', PostController.allPosts)
/** 
 * @route
 * @get
 * @desc show the post by given uuid 
 */
router.get('/post/:id', PostController.showPost)



module.exports = router