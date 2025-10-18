const Project = require('../models/projectModel');

// GET all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found in the database" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// GET a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: `Project not found with ID: ${req.params.id}` });
    }

    res.json(project);
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid project ID format" });
    }
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// CREATE a new project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(400).json({ message: "Failed to create project: " + error.message });
  }
};

// UPDATE an existing project by ID
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!project) {
      return res.status(404).json({ message: `No project found to update with ID: ${req.params.id}` });
    }

    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid project ID format" });
    }
    res.status(500).json({ message: "Failed to update project: " + error.message });
  }
};

// DELETE a single project by ID
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: `No project found to delete with ID: ${req.params.id}` });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid project ID format" });
    }
    res.status(500).json({ message: "Failed to delete project: " + error.message });
  }
};

// DELETE all projects
exports.deleteAllProjects = async (req, res) => {
  try {
    const result = await Project.deleteMany();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No projects found to delete" });
    }

    res.json({ message: "All projects deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all projects: " + error.message });
  }
};
