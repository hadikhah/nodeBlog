// const bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const expressLayouts = require('express-ejs-layouts');

const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const mongoose = require('mongoose');

const connectDB = require('./database');
const makePath = require("../utils/path");
const winston = require('./winston');

/**
 * configs
 *
 * @param {*} express
 */

function config(app) {
    // -------- connecting to DB --------
    connectDB()
    //
    // ---------- Middleware configs ----------
    /*  
    |    ** morgan logging only ** 
    |    if you need to log in other modes 
    |    just change development
    |    to whatever you want
    */
    // if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
    // using morgan in every environment
    app.use(morgan("combined", { stream: winston.stream }))
    /**/
    app.use(express.urlencoded({ extended: false }))
    //

    // ---------- view engine configs ----------
    app.set("view engine", 'ejs')
    app.set("views", "views")
    app.use(expressLayouts)
    app.set('layout', 'layouts/main')
    app.set('layout extractMetas', true)
    app.set('layout extractStyles', true)
    app.set('layout extractScripts', true)
    // 

    //------ statice files compression ---
    app.use(compression()); //use compression 
    //
    // ---------- statice files ----------
    app.use(express.static(makePath(["public"])))
    console.log(makePath(["public"]));
    app.use(express.static(makePath(["node_modules", "bulma"])))
    app.use(express.static(makePath(["node_modules", "font-awesome"])))
    // 

    // ---------- sessions ----------
    app.use(cookieParser());
    app.use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create(mongoose.connection)
        })
    );


    // ---------- flash session ----------
    app.use(flash());
    app.use(function (req, res, next) {
        //  adds flash sessions to the local variables so 
        //  they will be available inside views
        res.locals.flash = req.flash();

        // after validations fail and redirects, form values
        // will be stored in form_body so the user 
        // won't miss the input values
        if (res.locals.flash.form_body) {
            const form_body = JSON.parse(res.locals.flash.form_body)
            res.locals.flash.form_body = form_body
        }

        next();
    });
    // ---------- passport ----------
    require('./passport');
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(function (req, res, next) {
        // adds user data to the local variables if user is authenticated
        res.locals = {
            ...res.locals, auth: {
                user: req.user,
                isAuth: req.isAuthenticated()
            }
        }

        // adds user authentication status to local variables so they'll be available in views by default

        next()
    })

}

module.exports = config;


