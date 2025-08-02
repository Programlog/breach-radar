import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, ArrowRight } from 'lucide-react';

export default function WelcomeActions() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/check"
        className="btn btn-primary px-8 py-3 text-lg inline-flex items-center space-x-2"
      >
        <Search className="h-5 w-5" />
        <span>Check My Email</span>
        <ArrowRight className="h-5 w-5" />
      </Link>
      {!user && (
        <Link
          to="/register"
          className="btn btn-secondary px-8 py-3 text-lg"
        >
          Get Started Free
        </Link>
      )}
    </div>
  );
}
