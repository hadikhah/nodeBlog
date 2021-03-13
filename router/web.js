const router = require('express').Router();

//home page
router.get('/', (req, res) => {
    res.render('index', { pageTitle: "وبلاگ" })
})


module.exports = router