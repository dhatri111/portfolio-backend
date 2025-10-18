// Import mongoose to define schema and create the model
const mongoose = require('mongoose');

// Define the schema (structure) for the Project collection
const projectSchema = new mongoose.Schema({
    // Project title (required string)
    title: { type: String, required: true },

    // Project completion date (required date field)
    completion: { type: Date, required: true },

    // Description of the project (required string)
    description: { type: String, required: true }
});

// Export the Project model
// The collection name in MongoDB will automatically be 'projects'
module.exports = mongoose.model('Project', projectSchema);
