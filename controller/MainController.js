
/**
 * renders the main page
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.showIndexPage = (req, res) => {

    return res.render('blog/index', { pageTitle: "Blog | Home" })

}
