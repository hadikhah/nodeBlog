const Status = require("../models/Status")

/**
 * renders the main page
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.showIndexPage = async (req, res) => {

    // gets 8 of latest posts with public status
    const publishedPosts = await Status.findOne({ key: "public" }).populate({ path: "posts", options: { sort: { 'createdAt': -1 }, limit: 8 }, }).lean();

    console.log(publishedPosts)


    return res.render('blog/index', { pageTitle: "Blog | Home", layout: "layouts/main", publishedPosts })

}
