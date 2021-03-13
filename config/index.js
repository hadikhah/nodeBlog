// const bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');

const makePath = require("../utils/path")

/**
 * configs
 *
 * @param {*} express
 */

function config(app) {

    // ---------- Middleware configs ----------
    /*  
    |    ** morgan logging only ** 
    |    if you need to log in other modes 
    |    just change development
    |    to whatever you want
    */
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
    /*
    |
    |
    */
    app.use(express.urlencoded({ extended: false }))
    //

    // ---------- view engine configs ----------
    app.set("view engine", 'ejs')
    app.set("views", "Views")
    // 

    // ---------- statice files ----------
    app.use(express.static(makePath(["public"])))
    app.use(express.static(makePath(["node_modules", "bootstrap-v4-rtl", "dist"])))
    app.use(express.static(makePath(["node_modules", "font-awesome"])))
    // 
}

module.exports = config;


