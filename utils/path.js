const path = require('path');

const mainDirPath = process.env.PWD + '/server.js'
/**
 * discription : will return the path of the given file
 *               from root directory 
 * 
 * @param {object} filePath object of file path from root
 * @return fullPathFromDirectory  
 */
const makePath = (filePath) => {
    //this is root directory
    const rootDir = path.dirname(mainDirPath)

    if (typeof filePath === 'object') {
        let fullpath = '';
        //join all  
        filePath.forEach(element => {
            fullpath = path.join(fullpath, element)
        });
        // join to root directory and return it
        return path.join(rootDir, fullpath)

    } else {
        //throw error to make sure that input will be object

        const err = new Error('input must be object')
        // throw err
    }
}
module.exports = makePath