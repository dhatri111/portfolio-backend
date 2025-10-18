// Import mongoose to define schema and model
const mongoose = require('mongoose');

// Define the schema (structure) for a Contact document
const contactSchema = new mongoose.Schema({
    // First name of the contact (required string)
    firstname: { type: String, required: true },

    // Last name of the contact (required string)
    lastname: { type: String, required: true },

    // Email of the contact (required string)
    email: { type: String, required: true }
});

// Export the model so it can be used in controllers
// 'Contact' will be the collection name in MongoDB (pluralized to 'contacts')
module.exports = mongoose.model('Contact', contactSchema);
