import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchMaterials = async () => {
        const res = await axios.get('/materials');
        setMaterials(res.data);
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Xóa vật tư này?')) {
            await axios.delete(`/materials/${id}`);
            fetchMaterials();
        }
    };

    const handleEdit = (material) => {
        navigate('/admin/materials/add', { state: { editData: material } });
    };

    return (
        <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>📦 Danh sách Vật tư</h2>

            <input
                type="text"
                placeholder="Tìm kiếm vật tư..."
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
            />

            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr style={{ backgroundColor: '#e6f7ff' }}>
                        <th>Ảnh</th>
                        <th>Tên</th>
                        <th>Loại</th>
                        <th>Đơn vị</th>
                        <th>Số lượng</th>
                        <th>Nhà cung cấp</th>
                        <th>Giá</th>
                        <th>Ghi chú</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map(m => (
                        <tr key={m._id}>
                            <td><img src={m.image} alt="" width="50" style={{ borderRadius: 6 }} /></td>
                            <td>{m.name}</td>
                            <td>{m.category}</td>
                            <td>{m.unit}</td>
                            <td>{m.quantity}</td>
                            <td>{m.supplier}</td>
                            <td>{m.price?.toLocaleString()}đ</td>
                            <td>{m.notes}</td>
                            <td>
                                <button onClick={() => handleEdit(m)} style={iconBtn}><FaEdit /></button>
                                <button onClick={() => handleDelete(m._id)} style={iconBtn}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => navigate('/admin/materials/add')} style={addBtn}>
                <FaPlus /> Thêm Vật tư
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

export default Materials;
