const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');
// const morgan = require('morgan');


const webRoutes = require('./router/web.js');
const config = require('./config');

const app = express()

// -------- loading env files --------
dotenv.config({ path: './.env' })
//
// -------- configrations and middlewares --------
config(app)
//
// -------- web Routes --------
app.use(webRoutes)
//

const port = process.env.PORT || 1000
app.listen(port, () => {
    console.log(`app is runing in ${chalk.blue(process.env.NODE_ENV)} mode ${chalk.blue('http://localhost:') + chalk.yellow(port ? port : 1000)}`);
})