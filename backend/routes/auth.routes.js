const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: 'Email đã tồn tại' });

    const newUser = new User({
        name,
        email,
        password,
        roles: ['user'] // ✅ mặc định vai trò user
    });

    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công' });
});

router.post('/login', login);



// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // Không báo lỗi thật để tránh dò email tồn tại
            return res.status(200).json({ message: 'Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi.' });
        }

        // 🔐 (Giả lập) Tạo token reset và gửi email — ở đây chỉ log ra console
        const fakeResetLink = `http://localhost:3000/reset-password?email=${email}`;
        console.log(`🟡 [FAKE EMAIL] Reset link: ${fakeResetLink}`);

        return res.status(200).json({ message: 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email.' });
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
    }
});
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);
        user.password = hashed;
        await user.save();

        res.json({ message: 'Đã cập nhật mật khẩu mới' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;