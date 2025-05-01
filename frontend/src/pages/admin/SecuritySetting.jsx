import { FaLock } from 'react-icons/fa';

const SecuritySetting = () => {
    return (
        <div style={{ padding: 20 }}>
            <h2><FaLock /> Bảo mật hệ thống</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                <li>Mật khẩu người dùng được mã hóa (bcrypt) khi lưu trữ.</li>
                <li>Hệ thống sử dụng xác thực JWT (JSON Web Token).</li>
                <li>Các route quan trọng yêu cầu xác thực và phân quyền rõ ràng.</li>
                <li>Thông tin nhạy cảm được bảo vệ bằng HTTPS và token.</li>
                <li>Thực hiện kiểm tra đăng nhập sai và giới hạn số lần đăng nhập.</li>
            </ul>
        </div>
    );
};

export default SecuritySetting;
