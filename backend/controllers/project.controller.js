const Project = require('../models/Project');

// Tạo dự án mới
exports.createProject = async (req, res) => {
    const { name, description, startDate, endDate, budget, progress } = req.body;
    const image = req.file?.path;
    try {
        const newProject = await Project.create({
            name,
            description,
            startDate,
            endDate,
            budget,
            progress,
            image
        });
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy tất cả dự án
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy 1 dự án theo ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật dự án
exports.updateProject = async (req, res) => {
    try {
        const image = req.file?.path;
        const updatedData = { ...req.body };
        if (image) updatedData.image = image;

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa dự án
exports.deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
