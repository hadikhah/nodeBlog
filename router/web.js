const router = require('express').Router();

//home page
router.get('/', (req, res) => {
    res.render('index', { pageTitle: "وبلاگ" })
})
router.get('/Login', (req, res) => {
    res.render('login', { pageTitle: "ورود" })
})


module.exports = router