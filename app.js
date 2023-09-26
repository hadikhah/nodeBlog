const express = require('express');
const https = require("https");
// const morgan = require('morgan');
const dotenv = require('dotenv');
const fs = require('fs');
const chalk = require('chalk');


// -------- loading env files --------
dotenv.config({ path: './.env' })

// -------- loading env files --------
const webRoutes = require('./router/web.js');
const dashboardRoutes = require('./router/dashboard.js');
const postRoutes = require('./router/post.js');

const errorRoutes = require('./router/errors.js');
// -------- loading configurations --------
const config = require('./config');

const app = express()

// -------- loading env files --------
dotenv.config({ path: './.env' })
//
// -------- configurations and middleware --------
config(app)
//
// -------- web Routes --------
app.use(webRoutes)
app.use(dashboardRoutes)
app.use(postRoutes)
app.use(errorRoutes)
// 

const port = process.env.PORT || 1000

if (process.env.SSL !== "TRUE") {

    return app.listen(port, () => {
        console.log(`app is runing in ${chalk.blue(process.env.NODE_ENV)} mode ${chalk.blue('http://localhost:') + chalk.yellow(port ? port : 1000)}`);
    })
}

const options = {
    key: fs.readFileSync(__dirname + process.env.PRIVATE_KEY, 'utf8'),
    cert: fs.readFileSync(__dirname + process.env.CERT_PATH, 'utf8')
};

return https.createServer(options, app).listen(port, function () {
    console.log(`app is runing in ${chalk.blue(process.env.NODE_ENV)} mode ${chalk.blue('https://localhost:') + chalk.yellow(port ? port : 1000)}`);
});

