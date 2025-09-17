import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token, user, isLoading } = useAuth();

  if (isLoading) return <div className="text-center py-12 text-gray-600">Loading...</div>;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (window.location.pathname === '/admin' && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
