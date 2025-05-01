import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState('');
    const [filterProgress, setFilterProgress] = useState('all');
    const [filterDate, setFilterDate] = useState('');
    const navigate = useNavigate();

    const fetchProjects = async () => {
        const res = await axios.get('/projects');
        setProjects(res.data);
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa dự án này?')) {
            await axios.delete(`/projects/${id}`);
            fetchProjects();
        }
    };

    const handleEdit = (project) => {
        navigate('/admin/projects/add', { state: { editData: project } });
    };

    const filteredProjects = projects.filter(p => {
        const matchName = p.name.toLowerCase().includes(search.toLowerCase());
        const matchProgress = filterProgress === 'all'
            || (filterProgress === 'done' && +p.progress === 100)
            || (filterProgress === 'notdone' && +p.progress < 100);
        const matchDate = !filterDate || p.startDate?.slice(0, 10) === filterDate;
        return matchName && matchProgress && matchDate;
    });

    return (
        <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>📁 Danh sách Dự án</h2>

            <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm dự án..."
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: '8px', width: '200px' }}
                />

                <select value={filterProgress} onChange={e => setFilterProgress(e.target.value)}>
                    <option value="all">Tất cả</option>
                    <option value="done">Hoàn thành (100%)</option>
                    <option value="notdone">Chưa hoàn thành</option>
                </select>

                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>

            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr style={{ backgroundColor: '#e6f7ff' }}>
                        <th>Hình ảnh</th>
                        <th>Tên</th>
                        <th>Tiến độ (%)</th>
                        <th>Ngân sách</th>
                        <th>Bắt đầu</th>
                        <th>Kết thúc</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.map(p => (
                        <tr key={p._id}>
                            <td><img src={p.image} alt="" width="50" style={{ borderRadius: 6 }} /></td>
                            <td>{p.name}</td>
                            <td>{p.progress}%</td>
                            <td>{Number(p.budget).toLocaleString()}đ</td>
                            <td>{p.startDate?.slice(0, 10)}</td>
                            <td>{p.endDate?.slice(0, 10)}</td>
                            <td>
                                <button onClick={() => handleEdit(p)} style={iconBtn}><FaEdit /></button>
                                <button onClick={() => handleDelete(p._id)} style={iconBtn}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => navigate('/admin/projects/add')} style={addBtn}>
                <FaPlus /> Thêm Dự Án
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

export default Projects;
