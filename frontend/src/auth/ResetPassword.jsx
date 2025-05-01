import { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return alert('Mật khẩu xác nhận không khớp');
        }
        try {
            await axios.post('/auth/reset-password', { email, newPassword });
            alert('Đặt lại mật khẩu thành công');
            navigate('/');
        } catch (err) {
            alert('Lỗi đặt lại mật khẩu');
        }
    };

    return (
        <div style={wrapperStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={{ marginBottom: 20 }}>🔒 Đặt lại mật khẩu</h2>
                <input type="password" placeholder="Mật khẩu mới" value={newPassword} onChange={e => setNewPassword(e.target.value)} required style={inputStyle} />
                <input type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={inputStyle} />
                <button type="submit" style={buttonStyle}>Cập nhật mật khẩu</button>
                <div style={{ marginTop: 15, textAlign: 'center' }}>
                    <Link to="/" style={linkStyle}>Quay lại đăng nhập</Link>
                </div>
            </form>
        </div>
    );
};

const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5'
};

const formStyle = {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 300
};

const inputStyle = {
    padding: '10px 12px',
    marginBottom: 15,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 14
};

const buttonStyle = {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontWeight: 'bold',
    cursor: 'pointer'
};

const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: 13
};

export default ResetPassword;
