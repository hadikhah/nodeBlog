const multer = require("multer");
const fs = require('fs');
const makePath = require("./path");
const uuid = require("uuid").v4;


/**
 * multer disk storage configurations
 *
 */
exports.storage = multer.diskStorage({

    destination: (req, file, cb) => {

        const uploadPath = makePath(["public", "uploads"]);
        // make uploads path if not exists

        if (!fs.existsSync(uploadPath)) {
            fs.mkdir(uploadPath, { recursive: true }, (err) => {
                console.log(err);
            });
        }

        // set public/uploads as upload folder
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}_${Date.now()}.${file.mimetype.split("/").pop()}`);
    },
});

const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

/**
 * check if uploaded file or files has valid type
 *
 * @param {*} mimetype
 * @return {*} 
 */
function isValidFileType(mimetype) {
    console.log("file mime type", mimetype.split("/").pop())
    return validFileExtensions.image.indexOf(mimetype.split("/").pop()) > -1;
}

/**
 * set valid files configuration
 *
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 */
exports.fileFilter = (req, file, cb) => {

    const uploadPath = makePath(["public", "uploads"]);
    // make uploads path if not exists

    if (!fs.existsSync(uploadPath)) {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            console.log(err);
        });
    }

    if (isValidFileType(file.mimetype)) {
        cb(null, true);
    } else {
        cb(`supported image types : ${validFileExtensions.image.join(" , ")}`, false);
    }
};