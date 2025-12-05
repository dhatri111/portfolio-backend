const Contact = require('../models/contactModel');

// PUBLIC (GET)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (contacts.length === 0) return res.status(404).json({ success: false, message: "No contacts found" });
        res.json({ success: true, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.json({ success: true, data: contact });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PUBLIC (CREATE - For public contact form)
exports.createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, message: "Contact created successfully", data: contact });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// PROTECTED (Update/Delete - For admin management)
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.json({ success: true, message: "Contact updated successfully", data: contact });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.json({ success: true, message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteAllContacts = async (req, res) => {
    try {
        await Contact.deleteMany();
        res.json({ success: true, message: "All contacts deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};