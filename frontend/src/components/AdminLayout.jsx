import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaProjectDiagram, FaUsers, FaBoxOpen, FaSignOutAlt, FaChartPie, FaMoon, FaBell, FaBars, FaChevronDown, FaChevronRight, FaCog } from 'react-icons/fa';

const AdminLayout = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);
    const [employeeOpen, setEmployeeOpen] = useState(false);
    const [materialOpen, setMaterialOpen] = useState(false);
    const [settingOpen, setSettingOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const triggerNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <aside className="sidebar" style={{
                width: collapsed ? 70 : 220,
                padding: '15px 10px',
                borderRight: '1px solid #ccc',
                transition: '0.3s'
            }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <img
                        src="https://res.cloudinary.com/dfyk60djc/image/upload/v1746078924/professional-home-build-logo_111366-35_rdzlit.jpg"
                        alt="logo"
                        width={collapsed ? 40 : 80}
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <MenuSubItem to="/admin/dashboard" label={<><FaChartPie style={{ marginRight: 8 }} /> Dashboard</>} collapsed={collapsed} />
                <SidebarMenu icon={<FaProjectDiagram />} label="Dự án" open={projectOpen} onToggle={() => setProjectOpen(!projectOpen)} collapsed={collapsed}>
                    <MenuSubItem to="/admin/projects/list" label="Danh sách dự án" collapsed={collapsed} />
                    <MenuSubItem to="/admin/projects/add" label="Thêm dự án" collapsed={collapsed} />
                </SidebarMenu>
                <SidebarMenu icon={<FaUsers />} label="Nhân sự" open={employeeOpen} onToggle={() => setEmployeeOpen(!employeeOpen)} collapsed={collapsed}>
                    <MenuSubItem to="/admin/employees/list" label="Danh sách nhân sự" collapsed={collapsed} />
                    <MenuSubItem to="/admin/employees/add" label="Thêm nhân sự" collapsed={collapsed} />
                </SidebarMenu>
                <SidebarMenu icon={<FaBoxOpen />} label="Vật tư" open={materialOpen} onToggle={() => setMaterialOpen(!materialOpen)} collapsed={collapsed}>
                    <MenuSubItem to="/admin/materials/list" label="Danh sách vật tư" collapsed={collapsed} />
                    <MenuSubItem to="/admin/materials/add" label="Thêm vật tư" collapsed={collapsed} />
                </SidebarMenu>
                <SidebarMenu icon={<FaCog />} label="Cài đặt" open={settingOpen} onToggle={() => setSettingOpen(!settingOpen)} collapsed={collapsed}>
                    <MenuSubItem to="/admin/settings/config" label="Cấu hình chung" collapsed={collapsed} />
                    <MenuSubItem to="/admin/settings/roles" label="Phân quyền" collapsed={collapsed} />
                    <MenuSubItem to="/admin/settings/security" label="Bảo mật" collapsed={collapsed} />
                </SidebarMenu>
                <button className="logout-button" onClick={handleLogout} style={{
                    marginTop: 30,
                    width: '100%',
                    padding: '10px',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                }}>{!collapsed && <><FaSignOutAlt /> Đăng xuất</>}</button>
            </aside>

            {/* Main */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    borderBottom: '1px solid #ddd',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button onClick={() => setCollapsed(!collapsed)} style={circleBtn}><FaBars /></button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        <button onClick={() => setDarkMode(!darkMode)} style={circleBtn}><FaMoon /></button>
                        <button onClick={() => alert(notification || 'Không có thông báo')} style={circleBtn}><FaBell /></button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                background: '#2962ff', color: '#fff', width: 32, height: 32,
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>{user.name?.charAt(0) || 'A'}</div>
                            <div>
                                <strong>{user.name || 'Admin'}</strong><br />
                                <span style={{ fontSize: 12, color: '#666' }}>{user.email}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {notification && (
                    <div style={{
                        position: 'fixed',
                        top: 80,
                        right: 20,
                        background: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: 8
                    }}>
                        {notification}
                    </div>
                )}

                <main style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
                    <Outlet context={{ triggerNotification }} />
                </main>
            </div>
        </div>
    );
};

const SidebarMenu = ({ icon, label, children, open, onToggle, collapsed }) => (
    <div className="sidebar-menu" style={{ marginBottom: 8 }}>
        <div
            onClick={onToggle}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 15px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 500
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>{icon}</span>
                {!collapsed && <span>{label}</span>}
            </div>
            {!collapsed && <span>{open ? <FaChevronDown /> : <FaChevronRight />}</span>}
        </div>
        {open && !collapsed && <div style={{ marginLeft: 25, marginTop: 5 }}>{children}</div>}
    </div>
);

const MenuSubItem = ({ to, label, collapsed }) => {
    const location = useLocation();
    const active = location.pathname === to;

    return (
        <Link
            to={to}
            className={`menu-subitem ${active ? 'active-link' : ''}`}
            style={{
                display: 'block',
                padding: '6px 8px',
                textDecoration: 'none',
                fontWeight: active ? 'bold' : 'normal'
            }}
        >
            {!collapsed && label}
        </Link>
    );
};

const circleBtn = {
    border: 'none',
    background: '#eef2ff',
    borderRadius: '50%',
    width: 32,
    height: 32,
    fontSize: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export default AdminLayout;
