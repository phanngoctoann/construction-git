const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const settingsRoutes = require('./routes/settings');


dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));           // Đăng ký, đăng nhập, cập nhật tài khoản
app.use('/api/projects', require('./routes/project.routes'));    // Quản lý dự án
app.use('/api/employees', require('./routes/employee.routes'));  // Quản lý nhân sự
app.use('/api/materials', require('./routes/material.routes'));  // Quản lý vật tư
app.use('/api/reports', require('./routes/report.routes'));      // Báo cáo tổng hợp
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/settings', settingsRoutes);
// Mặc định
app.get('/', (req, res) => {
    res.send('API for Binh Dinh Tam Quan Construction Company is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
