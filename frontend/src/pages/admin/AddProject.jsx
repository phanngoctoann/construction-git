import { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSave, FaPlus } from 'react-icons/fa';

const AddProject = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editData = location.state?.editData || null;

    const [form, setForm] = useState({
        name: '', description: '', startDate: '', endDate: '',
        budget: '', progress: '', image: null
    });

    useEffect(() => {
        if (editData) {
            setForm({
                name: editData.name,
                description: editData.description,
                startDate: editData.startDate?.slice(0, 10),
                endDate: editData.endDate?.slice(0, 10),
                budget: editData.budget,
                progress: editData.progress,
                image: null
            });
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (form[key]) formData.append(key, form[key]);
        });

        if (editData) {
            await axios.put(`/projects/${editData._id}`, formData);
            alert('Cập nhật dự án thành công');
        } else {
            await axios.post('/projects', formData);
            alert('Thêm dự án thành công');
        }

        setForm({ name: '', description: '', startDate: '', endDate: '', budget: '', progress: '', image: null });
        navigate('/admin/projects/list');
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {editData ? <FaSave /> : <FaPlus />} {editData ? 'Cập nhật Dự án' : 'Thêm Dự án'}
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" style={formStyle}>
                <input type="text" placeholder="Tên dự án" value={form.name} required
                    onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />

                <textarea placeholder="Mô tả" value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, height: 80 }} />

                <input type="number" placeholder="Ngân sách (VND)" value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })} style={inputStyle} />

                <input type="number" placeholder="Tiến độ (%)" value={form.progress}
                    onChange={e => setForm({ ...form, progress: e.target.value })} style={inputStyle} />

                <div style={{ display: 'flex', gap: 10 }}>
                    <input type="date" value={form.startDate}
                        onChange={e => setForm({ ...form, startDate: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                    <input type="date" value={form.endDate}
                        onChange={e => setForm({ ...form, endDate: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                </div>

                <input type="file" accept="image/*"
                    onChange={e => setForm({ ...form, image: e.target.files[0] })} style={inputStyle} />

                <button type="submit" style={submitBtn}>
                    {editData ? '💾 Lưu cập nhật' : '➕ Thêm Dự án'}
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

export default AddProject;
