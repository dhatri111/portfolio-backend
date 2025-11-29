const Service = require('../models/serviceModel');

// PUBLIC
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        if (services.length === 0) return res.status(404).json({ success: false, message: "No services found" });
        res.json({ success: true, data: services });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });
        res.json({ success: true, data: service });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PROTECTED
exports.addService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({ success: true, message: "Service created successfully", data: service });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });
        res.json({ success: true, message: "Service updated successfully", data: service });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });
        res.json({ success: true, message: "Service deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteAllServices = async (req, res) => {
    try {
        await Service.deleteMany();
        res.json({ success: true, message: "All services deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
