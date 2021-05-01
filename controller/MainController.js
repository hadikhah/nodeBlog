class MainController {
    showIndexPage(req, res) {
        res.render('index', { pageTitle: "وبلاگ" })
    }
}
module.exports = MainController;