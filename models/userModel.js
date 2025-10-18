// Import mongoose to define schema and create the model
const mongoose = require('mongoose');

// Define the schema (structure) for the User collection
const UserSchema = new mongoose.Schema({
  // User's first name (required string)
  firstname: { type: String, required: true },

  // User's last name (required string)
  lastname: { type: String, required: true },

  // User's email (required and must be unique)
  email: { type: String, required: true, unique: true },

  // User's password (required string)
  password: { type: String, required: true },

  // Date of creation (automatically set to current date/time)
  created: { type: Date, default: Date.now },

  // Date of last update (optional, can be manually set)
  updated: { type: Date }
});

// Export the User model
// The collection name in MongoDB will be 'users'
module.exports = mongoose.model('user', UserSchema);
