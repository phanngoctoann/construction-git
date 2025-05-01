import { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', {
                name,
                email,
                password,
                roles: ['user']
            });
            alert('Đăng ký thành công!');
            navigate('/');
        } catch (err) {
            alert('Đăng ký thất bại: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div style={wrapperStyle}>
            <form onSubmit={handleRegister} style={formStyle}>
                <h2 style={{ marginBottom: 20 }}>📝 Đăng ký</h2>
                <input type="text" placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
                <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
                <button type="submit" style={buttonStyle}>Đăng ký</button>
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

export default Register;
