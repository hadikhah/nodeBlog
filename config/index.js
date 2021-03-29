// const bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const connectDB = require('./database');
const makePath = require("../utils/path")

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
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
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

    // ---------- statice files ----------
    app.use(express.static(makePath(["public"])))
    console.log(makePath(["public"]));
    app.use(express.static(makePath(["node_modules", "bulma"])))
    app.use(express.static(makePath(["node_modules", "font-awesome"])))
    // 
}

module.exports = config;


