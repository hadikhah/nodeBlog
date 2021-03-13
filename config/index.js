// const bodyParser = require('body-parser')
const express = require('express');

const makePath = require("../utils/path")

/**
 * configs
 *
 * @param {*} express
 */

function config(app) {
    // ---------- Middleware configs ----------
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


