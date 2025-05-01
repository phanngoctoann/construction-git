const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require('../controllers/project.controller');

const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Tạo dự án (admin)
router.post('/', verifyToken, isAdmin, upload.single('image'), createProject);

// Lấy danh sách và chi tiết (cho mọi người xem)
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Cập nhật & xóa dự án (chỉ admin)
router.put('/:id', verifyToken, isAdmin, upload.single('image'), updateProject);
router.delete('/:id', verifyToken, isAdmin, deleteProject);

module.exports = router;
