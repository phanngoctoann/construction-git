import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosInstance';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/forgot-password', { email });
            setMessage('Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi.');
        } catch (err) {
            setMessage('Không thể gửi yêu cầu. Vui lòng thử lại.');
        }
    };

    return (
        <div style={wrapperStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={{ marginBottom: 20 }}>🔑 Quên mật khẩu</h2>
                <input
                    type="email"
                    placeholder="Nhập email đăng ký"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Gửi yêu cầu</button>
                {message && <p style={{ marginTop: 15, color: '#333', fontSize: 14 }}>{message}</p>}
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

export default ForgotPassword;
