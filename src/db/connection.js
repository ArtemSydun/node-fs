const mongoose = require('mongoose');

const MONGO_DB_CONNECTION_STRING = process.env.MONGO_ATLAS_CONNECTION_STRING;
const MONGO_DB_NAME='Movies-libraries';

const connectDb = async () => { 
try {
    await mongoose.connect(`${MONGO_DB_CONNECTION_STRING}/${MONGO_DB_NAME}`);
    console.log('connection established')
} catch (error) {
    console.error(error);
    process.exit(1);
}
}


module.exports = {connectDb}
