const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Cập nhật vai trò người dùng (chỉ admin)

router.put('/:id/roles', verifyToken, isAdmin, async (req, res) => {
    const { roles } = req.body;
    const validRoles = ['admin', 'accountant', 'worker', 'user'];

    const isValid = roles.every(r => validRoles.includes(r));
    if (!isValid) return res.status(400).json({ message: 'Danh sách quyền không hợp lệ' });

    const user = await User.findByIdAndUpdate(req.params.id, { roles }, { new: true });
    res.json({ message: 'Đã cập nhật quyền', user });
});
router.get('/', async (req, res) => {
    const users = await User.find({}, 'name email role');
    res.json(users);
});
router.put('/:id/lock', verifyToken, isAdmin, async (req, res) => {
    try {
        const { locked } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { locked }, { new: true });
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        res.json({ message: locked ? 'Tài khoản đã bị khóa' : 'Tài khoản đã được mở khóa', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        res.json({ message: 'Đã xóa tài khoản thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
