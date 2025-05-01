import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { FaUserShield, FaTrash, FaLock, FaUnlock } from 'react-icons/fa';

const RoleSetting = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get('/users');
        setUsers(res.data);
    };

    const handleChangeRole = async (userId, role) => {
        await axios.put(`/users/${userId}/role`, { role });
        fetchUsers();
        alert('Đã cập nhật quyền người dùng');
    };

    const handleToggleLock = async (userId, isLocked) => {
        await axios.put(`/users/${userId}/lock`, { locked: !isLocked });
        fetchUsers();
        alert(`Tài khoản đã ${isLocked ? 'mở khóa' : 'khóa'}`);
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            await axios.delete(`/users/${userId}`);
            fetchUsers();
            alert('Đã xóa tài khoản');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2><FaUserShield /> Phân quyền người dùng</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'center' }}>
                <thead style={{ backgroundColor: '#e6f7ff' }}>
                    <tr>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Khóa</th>
                        <th>Cập nhật</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <button onClick={() => handleToggleLock(u._id, u.locked)}>
                                    {u.locked ? <FaUnlock title="Mở khóa tài khoản" /> : <FaLock title="Khóa tài khoản" />}
                                </button>
                            </td>
                            <td>
                                <select
                                    value={u.role}
                                    onChange={(e) => handleChangeRole(u._id, e.target.value)}
                                >
                                    <option value="user">Người dùng</option>
                                    <option value="admin">Quản trị viên</option>
                                    <option value="accountant">Kế toán</option>
                                    <option value="worker">Nhân công</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteUser(u._id)}><FaTrash title="Xóa tài khoản" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoleSetting;
