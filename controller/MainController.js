class MainController {
    showIndexPage(req, res) {
        return res.render('blog/index', { pageTitle: "Blog | Home" })
    }
}
module.exports = MainController;