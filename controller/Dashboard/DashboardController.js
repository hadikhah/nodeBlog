class DashboardController {
    showDashboardVuePage(req, res) {
        res.render('vue', { pageTitle: "ورود", layout: "layouts/empty" })
    }
    showDahsboardPage(req, res) {
        res.render('dashboard', { pageTitle: "ورود", layout: "layouts/dashboard" })
    }
}
module.exports = DashboardController