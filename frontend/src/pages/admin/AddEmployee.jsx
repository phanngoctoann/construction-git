import { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSave } from 'react-icons/fa';

const AddEmployee = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editData = location.state?.editData || null;

    const [form, setForm] = useState({
        name: '', email: '', phone: '', position: '', department: '',
        address: '', salary: '', startDate: '', avatar: null
    });

    useEffect(() => {
        if (editData) {
            setForm({
                name: editData.name,
                email: editData.email,
                phone: editData.phone,
                position: editData.position,
                department: editData.department,
                address: editData.address,
                salary: editData.salary,
                startDate: editData.startDate?.slice(0, 10),
                avatar: null
            });
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(form).forEach(k => form[k] && data.append(k, form[k]));

        if (editData) {
            await axios.put(`/employees/${editData._id}`, data);
            alert('Cập nhật nhân sự thành công');
        } else {
            await axios.post('/employees', data);
            alert('Thêm nhân sự thành công');
        }

        setForm({ name: '', email: '', phone: '', position: '', department: '', address: '', salary: '', startDate: '', avatar: null });
        navigate('/admin/employees/list');
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {editData ? <FaSave /> : <FaUserPlus />} {editData ? 'Cập nhật Nhân sự' : 'Thêm Nhân sự'}
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" style={formStyle}>
                <input type="text" placeholder="Họ tên" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                <input type="tel" placeholder="Điện thoại" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Vị trí" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Bộ phận" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Địa chỉ" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} style={inputStyle} />
                <input type="number" placeholder="Lương" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} style={inputStyle} />
                <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} style={inputStyle} />
                <input type="file" accept="image/*" onChange={e => setForm({ ...form, avatar: e.target.files[0] })} style={inputStyle} />

                <button type="submit" style={submitBtn}>
                    {editData ? '💾 Lưu cập nhật' : '➕ Thêm Nhân sự'}
                </button>
            </form>
        </div>
    );
};

const formStyle = {
    display: 'flex', flexDirection: 'column', gap: 15,
    padding: 20, background: '#f9f9f9', borderRadius: 10, boxShadow: '0 0 8px rgba(0,0,0,0.1)'
};

const inputStyle = {
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 14,
    width: '100%'
};

const submitBtn = {
    background: '#007bff',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default AddEmployee;
