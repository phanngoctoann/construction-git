import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalEmployees: 0,
        totalMaterials: 0,
        totalInventory: 0,
        totalBudget: 0,
        avgProgress: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const res = await axios.get('/reports/admin');
            setStats(res.data);
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>📊 Thống kê tổng quan</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Card color="#4CAF50" title="Tổng dự án" value={stats.totalProjects} icon="📁" />
                <Card color="#FF9800" title="Tổng nhân sự" value={stats.totalEmployees} icon="👥" />
                <Card color="#2196F3" title="Tổng vật tư" value={stats.totalMaterials} icon="📦" />
                <Card color="#673AB7" title="Tồn kho" value={stats.totalInventory} icon="🏷️" />
                <Card color="#009688" title="Tổng ngân sách" value={stats.totalBudget.toLocaleString()} icon="💰" />
                <Card color="#795548" title="Tiến độ TB (%)" value={stats.avgProgress + '%'} icon="📈" />
            </div>
        </div>
    );
};

const Card = ({ title, value, icon, color }) => (
    <div style={{
        flex: '1 1 250px',
        backgroundColor: color,
        padding: '20px',
        borderRadius: '12px',
        color: 'white',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}>
        <h4>{icon} {title}</h4>
        <h2 style={{ marginTop: '10px', fontSize: '28px' }}>{value}</h2>
    </div>
);

export default Dashboard;
