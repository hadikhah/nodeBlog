class DashboardController {
    showDashboardVuePage(req, res) {
        // res.render('vue', { pageTitle: "ورود", layout: "layouts/empty" })
        res.send("vue")
    }
    showDahsboardPage(req, res) {
        res.render('dashboard/dashboard', { pageTitle: "ورود", layout: "layouts/dashboard" })
    }
}
module.exports = DashboardController