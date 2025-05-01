const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const {
    createMaterial,
    getAllMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial
} = require('../controllers/material.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// CRUD vật tư (chỉ admin)
router.post('/', verifyToken, isAdmin, upload.single('image'), createMaterial);
router.get('/', verifyToken, isAdmin, getAllMaterials);
router.get('/:id', verifyToken, isAdmin, getMaterialById);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), updateMaterial);
router.delete('/:id', verifyToken, isAdmin, deleteMaterial);

module.exports = router;
