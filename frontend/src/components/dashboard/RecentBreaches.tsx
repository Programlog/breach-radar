import { AlertTriangle } from 'lucide-react';
import { RecentBreach } from '../../types/dashboard';
import { formatDate } from '@/utils/date';


function BreachItem({ breach }: { breach: RecentBreach }) {
    return (
    <div key={breach.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-full ${breach.isVerified ? 'bg-red-100' : 'bg-yellow-100'}`}>
        <AlertTriangle className={`h-4 w-4 ${breach.isVerified ? 'text-red-600' : 'text-yellow-600'}`} />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{breach.breachName}</h3>
        <p className="text-sm text-gray-500">
          {breach.domain} • {formatDate(breach.breachDate)}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-gray-900">
        {breach.pwnCount.toLocaleString()} accounts
      </p>
      {breach.isVerified && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Verified
        </span>
      )}
    </div>
  </div>
  );
}

export default function RecentBreaches({ breaches }: { breaches: RecentBreach[] })  {
    return (
        <div className="card">
            <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900">Recent Breaches</h2>
            </div>
            <div className="card-content">
            <div className="space-y-4">
                {breaches.map((breach) => (
                <BreachItem key={breach.id} breach={breach} />
                ))}
            </div>
            </div>
        </div>
  );
}
