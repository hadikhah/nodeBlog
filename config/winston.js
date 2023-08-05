const winston = require('winston');
const makePath = require('../utils/path');


const options = {
    File: {
        filename: makePath(["logs", "app.log"]),
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5 * 1024 * 1024,
        maxFile: 5
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.File)
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message) {
        logger.info(message)
    }
}

module.exports = logger