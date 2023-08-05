exports.HandleLogout = (req, res, next) => {

    req.logout(err => {
        if (err) { console.log(err); }

        return res.redirect("/")
    });


}

// module.exports = { HandleLogout }