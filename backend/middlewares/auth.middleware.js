const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware kiểm tra vai trò Admin
exports.isAdmin = (req, res, next) => {
    if (!req.user.roles.includes('admin')) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};


// Middleware xác thực JWT
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Thiếu token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // chứa { id, role, email... }
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token không hợp lệ' });
    }
};

// Chỉ cho admin
exports.isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Chỉ quản trị viên mới có quyền' });
    }
    next();
};


exports.hasRole = (role) => (req, res, next) => {
    if (!req.user?.roles.includes(role)) {
        return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    next();
};
