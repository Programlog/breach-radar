import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-4">
          <Shield className="h-5 w-5 text-primary-600" />
          <span className="text-sm text-gray-500">
            © 2025 Breach Radar.
          </span>
        </div>
      </div>
    </footer>
  );
}
