import { useAuth } from '../../context/AuthContext';
import { formatDateTime } from '@/utils/date';

export default function AccountInfo({ lastCheck }: { lastCheck?: string }) {
  const { user } = useAuth();

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Email</p>
          <p className="font-medium text-gray-900">{user?.email}</p>
        </div>
        {lastCheck && (
          <div>
            <p className="text-sm text-gray-600">Last Check</p>
            <p className="font-medium text-gray-900">
              {formatDateTime(lastCheck)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}