const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { setFormSuccessMessage } = require('../../validation/Validator');

/**
 * renders dashboard main page
 *
 * @param {*} req
 * @param {*} res
 */
exports.showDashboardPage = (req, res) => {

    return res.render('dashboard/dashboard', { pageTitle: "dashboard", layout: "layouts/dashboard" })

}

/**
 * renders dashboard profile page
 *
 * @param {*} req
 * @param {*} res
 */
exports.showDashboardProfilePage = (req, res) => {

    return res.render('dashboard/profile', { pageTitle: "profile", layout: "layouts/dashboard", user: req.user })

}


/**
 * updates users password
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.updateProfilePassword = async (req, res) => {

    try {

        if (!bcrypt.compareSync(req.body.current_password, req.user.password)) {

            setPreviousFormErrors(req, ["password is not correct"])

            return res.redirect("back")
        }

        bcrypt.hash(req.body.new_password, 10, async (err, hash) => {

            await User.findOneAndUpdate({ _id: req.user._id }, { password: hash })

            setFormSuccessMessage(req, "password successfully changed")

            return res.redirect("back")

        })

    } catch (error) {
        if (error.name && error.message)
            return res.send(error.message)

        else
            return res.redirect('/500')
    }

}


/**
 * saves user's profile changes
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.updateProfile = async (req, res) => {

    try {
        await User.findById(req.user._id).update(req.body)

        setFormSuccessMessage(req, "profile successfully updated")

        return res.redirect("back")

    } catch (error) {
        if (error.name && error.message)
            return res.send(error.message)

        else
            return res.redirect('/500')
    }
}
