import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';


import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Projects from './pages/admin/Projects';
import AddProject from './pages/admin/AddProject';
import Employees from './pages/admin/Employees';
import AddEmployee from './pages/admin/AddEmployee';
import Materials from './pages/admin/Materials';
import AddMaterial from './pages/admin/AddMaterial';
import ConfigSetting from './pages/admin/ConfigSetting';
import RoleSetting from './pages/admin/RoleSetting';
import SecuritySetting from './pages/admin/SecuritySetting';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Trang đăng nhập */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* Trang Admin */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route path="dashboard" element={<Dashboard />} />

                    {/* Dự án */}
                    <Route path="projects/list" element={<Projects />} />
                    <Route path="projects/add" element={<AddProject />} />

                    {/* Nhân sự */}
                    <Route path="employees/list" element={<Employees />} />
                    <Route path="employees/add" element={<AddEmployee />} />

                    {/* Vật tư */}
                    <Route path="materials/list" element={<Materials />} />
                    <Route path="materials/add" element={<AddMaterial />} />

                    {/* Cài đặt hệ thống */}
                    <Route path="settings/config" element={<ConfigSetting />} />
                    <Route path="settings/roles" element={<RoleSetting />} />
                    <Route path="settings/security" element={<SecuritySetting />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;



