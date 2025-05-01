import { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', {
                email: email.trim(),
                password: password.trim()
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if (res.data.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                alert('Không có quyền truy cập admin');
            }
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            alert('Sai thông tin đăng nhập');
        }
    };

    return (
        <div style={wrapperStyle}>
            <form onSubmit={handleLogin} style={formStyle}>
                <h2 style={{ marginBottom: 20 }}>🔐 Đăng nhập Admin</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Đăng nhập</button>

                <div style={{ marginTop: 15, textAlign: 'center' }}>
                    <Link to="/register" style={linkStyle}>Đăng ký tài khoản</Link>
                    <br />
                    <Link to="/forgot-password" style={linkStyle}>Quên mật khẩu?</Link>
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

export default Login;
