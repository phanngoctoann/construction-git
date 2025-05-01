import { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';
import { FaCog } from 'react-icons/fa';

const ConfigSetting = () => {
    const [settings, setSettings] = useState({ siteTitle: '', maintenance: false });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const res = await axios.get('/settings');
        setSettings(res.data);
    };

    const handleSaveSettings = async () => {
        await axios.put('/settings', settings);
        alert('Đã lưu cấu hình hệ thống');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2><FaCog /> Cấu hình chung</h2>
            <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                placeholder="Tiêu đề hệ thống"
                style={inputStyle}
            />
            <label>
                <input
                    type="checkbox"
                    checked={settings.maintenance}
                    onChange={(e) => setSettings({ ...settings, maintenance: e.target.checked })}
                /> Bảo trì hệ thống
            </label>
            <br />
            <button onClick={handleSaveSettings} style={btn}>💾 Lưu cấu hình</button>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    border: '1px solid #ccc',
    borderRadius: 6
};

const btn = {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default ConfigSetting;
