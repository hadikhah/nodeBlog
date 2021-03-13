const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');
// const morgan = require('morgan');


const webRoutes = require('./router/web.js');
const config = require('./config');

const app = express()

const port = process.env.PORT

// -------- loading env files --------
dotenv.config({ path: '.env' })
//
// -------- configrations and middlewares --------
config(app)
//
// -------- web Routes --------
app.use(webRoutes)
//


app.listen(process.env.PORT ? process.env.PORT : 1000, () => {
    console.log(`app is runing in ${chalk.blue(process.env.NODE_ENV)} mode ${chalk.blue('http://localhost:') + chalk.yellow(process.env.PORT ? process.env.PORT : 1000)}`);
})