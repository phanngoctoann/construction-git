console.log('⚙️ Bắt đầu tạo admin...');



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/User');

(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const hashed = await bcrypt.hash('123456', 10);
    const admin = await User.create({
        name: 'Admin',
        email: 'admin@company.com',
        password: hashed,
        role: 'admin'
    });
    console.log('✅ Admin created:', admin);
    process.exit();
})();
