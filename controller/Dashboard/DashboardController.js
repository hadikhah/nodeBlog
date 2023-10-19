const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const Post = require('../../models/Post');

const { setFormSuccessMessage } = require('../../validation/Validator');
const { truncate } = require('../../utils/helpers');

/**
 * renders dashboard main page
 *
 * @param {*} req
 * @param {*} res
 */
exports.showDashboardPage = async (req, res) => {

    try {
        const totalPosts = await Post.countDocuments({ user: req.user._id })

        const user = await User.findOne({ _id: req.user._id }).populate({
            path: "posts",
            options: { sort: { 'createdAt': -1 }, limit: 4 },
            populate: { path: "status" }
        }).lean()

        const posts = user.posts

        return res.render('dashboard/dashboard', { pageTitle: "dashboard", layout: "layouts/dashboard", totalPosts, posts, truncate })

    } catch (error) {

        if (error.name && error.message)
            return res.send(error.message)

        else
            return res.redirect('/500')

    }

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
