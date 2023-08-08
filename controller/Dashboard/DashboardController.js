
/**
 * renders dashboard main page
 *
 * @param {*} req
 * @param {*} res
 */
exports.showDashboardPage = (req, res) => {

    return res.render('dashboard/dashboard', { pageTitle: "ورود", layout: "layouts/dashboard" })

}
