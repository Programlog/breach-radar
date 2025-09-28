import { Link } from 'react-router-dom';
import { useNavigation } from '../../hooks/useNavigation';

export default function Navigation() {
  const { navigation, isActive } = useNavigation();

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive(item.href)
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
