const Service = require('../models/serviceModel');

// GET all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (services.length === 0) {
      return res.status(404).json({ message: "No services found in the database" });
    }

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// GET a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: `Service not found with ID: ${req.params.id}` });
    }

    res.json(service);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid service ID format" });
    }
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// CREATE a new service
exports.addService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();

    res.status(201).json({ message: "Service created successfully", service });
  } catch (err) {
    res.status(400).json({ message: "Failed to create service: " + err.message });
  }
};

// UPDATE an existing service by ID
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!service) {
      return res.status(404).json({ message: `No service found to update with ID: ${req.params.id}` });
    }

    res.json({ message: "Service updated successfully", service });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid service ID format" });
    }
    res.status(500).json({ message: "Failed to update service: " + err.message });
  }
};

// DELETE a single service by ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: `No service found to delete with ID: ${req.params.id}` });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid service ID format" });
    }
    res.status(500).json({ message: "Failed to delete service: " + err.message });
  }
};

// DELETE all services
exports.deleteAllServices = async (req, res) => {
  try {
    const result = await Service.deleteMany();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No services found to delete" });
    }

    res.json({ message: "All services deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete all services: " + err.message });
  }
};
  