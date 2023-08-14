const router = require('express').Router();

// 404 error page
router.use((req, res) => {
	res.render('errors/404-error', { pageTitle: "ورود", layout: "layouts/base" })
})

module.exports = router