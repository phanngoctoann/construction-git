const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employee.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// CRUD nhân sự (chỉ admin)
router.post('/', verifyToken, isAdmin, upload.single('avatar'), createEmployee);
router.get('/', verifyToken, isAdmin, getAllEmployees);
router.get('/:id', verifyToken, isAdmin, getEmployeeById);
router.put('/:id', verifyToken, isAdmin, upload.single('avatar'), updateEmployee);
router.delete('/:id', verifyToken, isAdmin, deleteEmployee);

module.exports = router;
