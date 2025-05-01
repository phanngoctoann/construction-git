const Employee = require('../models/Employee');

// Tạo nhân sự mới
exports.createEmployee = async (req, res) => {
    const { name, position, department, phone, email, address, salary, startDate } = req.body;
    const avatar = req.file?.path;
    try {
        const newEmployee = await Employee.create({
            name, position, department, phone, email, address, salary, startDate, avatar
        });
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Lấy danh sách
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy 1 nhân sự
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật nhân sự
exports.updateEmployee = async (req, res) => {
    const avatar = req.file?.path;
    const updatedData = { ...req.body };
    if (avatar) updatedData.avatar = avatar;

    try {
        const updated = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa nhân sự
exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
