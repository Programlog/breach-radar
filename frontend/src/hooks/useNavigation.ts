import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export interface NavigationItem {
  name: string;
  href: string;
}

export function useNavigation() {
  const { user } = useAuth();
  const location = useLocation();

  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Check Breach', href: '/check' },
    ...(user ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ];

  const isActive = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return {
    navigation,
    isActive,
    currentPath: location.pathname,
  };
}
