const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // because of deprecated warning : URL string parser is deprecated
            useNewUrlParser: true,
            // because of deprecated warning :current Server Discovery and Monitoring engine is deprecated
            useUnifiedTopology: true,
            //
            useFindAndModify: true
        })
        console.log(`mongo connected to: ${chalk.blue(conn.connection.host)} `)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
module.exports = connectDB