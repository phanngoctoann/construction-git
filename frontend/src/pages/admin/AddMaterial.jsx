import { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaSave } from 'react-icons/fa';

const AddMaterial = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editData = location.state?.editData || null;

    const [form, setForm] = useState({
        name: '', category: '', unit: '', quantity: '',
        supplier: '', price: '', notes: '', image: null
    });

    useEffect(() => {
        if (editData) {
            setForm({
                name: editData.name,
                category: editData.category,
                unit: editData.unit,
                quantity: editData.quantity,
                supplier: editData.supplier,
                price: editData.price,
                notes: editData.notes,
                image: null
            });
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(form).forEach(k => form[k] && data.append(k, form[k]));

        if (editData) {
            await axios.put(`/materials/${editData._id}`, data);
            alert('Cập nhật vật tư thành công');
        } else {
            await axios.post('/materials', data);
            alert('Thêm vật tư thành công');
        }

        setForm({ name: '', category: '', unit: '', quantity: '', supplier: '', price: '', notes: '', image: null });
        navigate('/admin/materials/list');
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {editData ? <FaSave /> : <FaBoxOpen />} {editData ? 'Cập nhật Vật tư' : 'Thêm Vật tư'}
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" style={formStyle}>
                <input type="text" placeholder="Tên vật tư" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Loại" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Đơn vị tính" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} style={inputStyle} />
                <input type="number" placeholder="Số lượng" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Nhà cung cấp" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} style={inputStyle} />
                <input type="number" placeholder="Giá" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} />
                <textarea placeholder="Ghi chú" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...inputStyle, height: 80 }}></textarea>
                <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} style={inputStyle} />

                <button type="submit" style={submitBtn}>
                    {editData ? '💾 Lưu cập nhật' : '➕ Thêm Vật tư'}
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

export default AddMaterial;
