const Project = require('../models/Project');
const Employee = require('../models/Employee');
const Material = require('../models/Material');

exports.getAdminDashboardReport = async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const totalBudget = await Project.aggregate([{ $group: { _id: null, sum: { $sum: "$budget" } } }]);
        const avgProgress = await Project.aggregate([{ $group: { _id: null, avg: { $avg: "$progress" } } }]);

        const totalEmployees = await Employee.countDocuments();
        const totalMaterials = await Material.countDocuments();
        const totalInventory = await Material.aggregate([{ $group: { _id: null, quantity: { $sum: "$quantity" } } }]);

        res.json({
            totalProjects,
            totalBudget: totalBudget[0]?.sum || 0,
            avgProgress: avgProgress[0]?.avg?.toFixed(2) || 0,
            totalEmployees,
            totalMaterials,
            totalInventory: totalInventory[0]?.quantity || 0
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
