// Load environment variables from the .env file (like MONGO_URL)
require('dotenv').config();

// Import mongoose for MongoDB connection
const mongoose = require('mongoose');
//mongose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

// Get MongoDB connection URL from environment variables
const MONGO_URL = process.env.MONGO_URL;

// Define an async function to connect to MongoDB
const connect = async () => {
  try {
    // Attempt to connect using the URL and recommended options
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Log success message once connected
    console.log(`Connected to MongoDB: ${MONGO_URL}`);
  } catch (err) {
    // If connection fails, log error and exit the process
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Export both the connect function and the URL for use in other files
module.exports = { connect, MONGO_URL };
