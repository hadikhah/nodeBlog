const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // becuase of depricated warning : URL string parser is deprecated
            useNewUrlParser: true,
            // becuase of depricated warning :current Server Discovery and Monitoring engine is deprecated
            useUnifiedTopology: true,
            //
            useFindAndModify: true
        })
        console.log(`mogo connected to: ${chalk.blue(conn.connection.host)} `)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
module.exports = connectDB