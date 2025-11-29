const Project = require('../models/projectModel');

// PUBLIC
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        if (projects.length === 0) return res.status(404).json({ success: false, message: "No projects found" });
        res.json({ success: true, data: projects });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        res.json({ success: true, data: project });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PROTECTED
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, message: "Project created successfully", data: project });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        res.json({ success: true, message: "Project updated successfully", data: project });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        res.json({ success: true, message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteAllProjects = async (req, res) => {
    try {
        await Project.deleteMany();
        res.json({ success: true, message: "All projects deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
