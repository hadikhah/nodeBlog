const router = require('express').Router();

//home page
router.get('/', (req, res) => {
    res.render('index', { pageTitle: "وبلاگ" })
})
router.get('/login', (req, res) => {
    res.render('login', { pageTitle: "ورود", layout: "layouts/base" })
})
router.get('/register', (req, res) => {
    res.render('register', { pageTitle: "ورود", layout: "layouts/base" })
})
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { pageTitle: "ورود", layout: "layouts/dashboard" })
})
router.use((req, res) => {
    res.send('404')
})

module.exports = router