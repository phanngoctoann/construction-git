const express = require('express');
const router = express.Router();
const { getAdminDashboardReport } = require('../controllers/report.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/admin', verifyToken, isAdmin, getAdminDashboardReport);

module.exports = router;
