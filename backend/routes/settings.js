// routes/settings.js
const express = require('express');
const router = express.Router();

// Dữ liệu cấu hình mẫu (có thể lưu DB sau)
let settings = {
    siteTitle: 'Xây Dựng Bình Định',
    maintenance: false
};

// Lấy cấu hình hệ thống
router.get('/', (req, res) => {
    res.json(settings);
});

// Cập nhật cấu hình hệ thống
router.put('/', (req, res) => {
    const { siteTitle, maintenance } = req.body;
    settings.siteTitle = siteTitle || settings.siteTitle;
    settings.maintenance = maintenance !== undefined ? maintenance : settings.maintenance;
    res.json({ success: true, updated: settings });
});

module.exports = router;
