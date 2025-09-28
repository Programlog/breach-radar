import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthSection() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{user.email}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link
        to="/login"
        className="text-sm font-medium text-gray-700 hover:text-primary-600"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="btn btn-primary px-4 py-2 text-sm"
      >
        Register
      </Link>
    </div>
  );
}
