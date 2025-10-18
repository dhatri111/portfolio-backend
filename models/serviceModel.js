// Import mongoose to define schema and model
const mongoose = require('mongoose');

// Define the schema (structure) for the Service collection
const serviceSchema = new mongoose.Schema({
    // Title of the service (required string)
    title: { type: String, required: true },

    // Description of the service (required string)
    description: { type: String, required: true }
});

// Export the Service model
// MongoDB will automatically use the plural form 'services' for the collection name
module.exports = mongoose.model('Service', serviceSchema);
