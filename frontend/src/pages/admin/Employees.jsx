import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        const res = await axios.get('/employees');
        setEmployees(res.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Xóa nhân sự này?')) {
            await axios.delete(`/employees/${id}`);
            fetchEmployees();
        }
    };

    const handleEdit = (employee) => {
        navigate('/admin/employees/add', { state: { editData: employee } });
    };

    return (
        <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>👥 Danh sách Nhân sự</h2>

            <input
                type="text"
                placeholder="Tìm kiếm..."
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
            />

            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr style={{ backgroundColor: '#e6f7ff' }}>
                        <th>Ảnh</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Vị trí</th>
                        <th>Bộ phận</th>
                        <th>Lương</th>
                        <th>Bắt đầu</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase())).map(emp => (
                        <tr key={emp._id}>
                            <td><img src={emp.avatar} alt="avatar" width="50" style={{ borderRadius: '50%' }} /></td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.position}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary?.toLocaleString()}đ</td>
                            <td>{emp.startDate?.slice(0, 10)}</td>
                            <td>
                                <button onClick={() => handleEdit(emp)} style={iconBtn}><FaEdit /></button>
                                <button onClick={() => handleDelete(emp._id)} style={iconBtn}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => navigate('/admin/employees/add')} style={addBtn}>
                <FaPlus /> Thêm Nhân sự
            </button>
        </div>
    );
};

const iconBtn = {
    background: '#f0f0f0',
    border: '1px solid #ccc',
    padding: '6px 10px',
    borderRadius: 6,
    margin: '0 3px',
    cursor: 'pointer'
};

const addBtn = {
    marginTop: 20,
    padding: '8px 14px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6
};

export default Employees;
