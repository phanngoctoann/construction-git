const Material = require('../models/Material');

// Thêm vật tư mới
exports.createMaterial = async (req, res) => {
    const { name, category, unit, quantity, supplier, price, notes } = req.body;
    const image = req.file?.path;
    try {
        const newMaterial = await Material.create({
            name, category, unit, quantity, image, supplier, price, notes
        });
        res.status(201).json(newMaterial);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Danh sách vật tư
exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.find().sort({ createdAt: -1 });
        res.json(materials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Chi tiết vật tư
exports.getMaterialById = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).json({ message: 'Not found' });
        res.json(material);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật vật tư
exports.updateMaterial = async (req, res) => {
    const image = req.file?.path;
    const updatedData = { ...req.body };
    if (image) updatedData.image = image;

    try {
        const updated = await Material.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa vật tư
exports.deleteMaterial = async (req, res) => {
    try {
        const deleted = await Material.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
