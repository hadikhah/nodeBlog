const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

/**
 * attempt to check if credentials match the database
 *
 * @param {*} email
 * @param {*} password
 * @param {*} done
 * @return {*} 
 */
const attempt = async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user || !bcrypt.compare(password, user.password))
            return done(null, false, { message: "no match for credentials" })

        return done(null, user)

    } catch (err) {
        console.log(err)
    }
}


passport.use(new Strategy({ usernameField: "email" }, attempt))


passport.serializeUser((user, done) => {

    done(null, user)

})

passport.deserializeUser((id, done) => {

    User.findById(id, (err, user) => {
        done(err, user)
    })

})