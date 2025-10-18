// Load environment variables from the .env file (like MONGO_URI)
require('dotenv').config();

// Import mongoose for MongoDB connection
const mongoose = require('mongoose');
//mongose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Get MongoDB connection URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Define an async function to connect to MongoDB
const connect = async () => {
  try {
    // Attempt to connect using the URI and recommended options
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Log success message once connected
    console.log(`Connected to MongoDB: ${MONGO_URI}`);
  } catch (err) {
    // If connection fails, log error and exit the process
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Export both the connect function and the URI for use in other files
module.exports = { connect, MONGO_URI };
