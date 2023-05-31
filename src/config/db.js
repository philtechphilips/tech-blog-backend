const mongoose =  require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function initialize() {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 300000,
        socketTimeoutMS: 300000
    };

    try {
        await mongoose.connect(process.env.DB_URI, options);
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log(`Could not connect to MongoDB... ${error.message}`);
    }
}

module.exports = initialize;