import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
        <Shield className="h-10 w-10 text-primary-600" />
        <span className="text-2xl font-bold text-gray-900">Breach Radar</span>
      </Link>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
