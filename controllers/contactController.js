// Import the Contact model
const Contact = require('../models/contactModel');

// GET all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();

        // If database has no contacts
        if (contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found in the database" });
        }

        // Return all contacts
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
};


// GET a single contact by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        // If contact not found
        if (!contact) {
            return res.status(404).json({ message: `Contact not found with ID: ${req.params.id}` });
        }

        res.json(contact);
    } catch (err) {
        // Handle invalid MongoDB ObjectId or server errors
        if (err.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid contact ID format" });
        }
        res.status(500).json({ message: "Server error: " + err.message });
    }
};


// CREATE a new contact
exports.createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: "Contact created successfully", contact });
    } catch (err) {
        res.status(400).json({ message: "Failed to create contact: " + err.message });
    }
};


// UPDATE a contact by ID
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!contact) {
            return res.status(404).json({ message: `No contact found to update with ID: ${req.params.id}` });
        }

        res.json({ message: "Contact updated successfully", contact });
    } catch (err) {
        res.status(400).json({ message: "Failed to update contact: " + err.message });
    }
};


// DELETE a single contact by ID
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: `No contact found to delete with ID: ${req.params.id}` });
        }

        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete contact: " + err.message });
    }
};


// DELETE all contacts
exports.deleteAllContacts = async (req, res) => {
    try {
        const result = await Contact.deleteMany();

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No contacts found to delete" });
        }

        res.json({ message: "All contacts deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete all contacts: " + err.message });
    }
};
