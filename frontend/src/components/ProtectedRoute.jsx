import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role = 'admin' }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || user?.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
