import { Clock } from 'lucide-react';
import { CheckHistory as CheckHistoryType } from '../../types/dashboard';
import { formatDate } from '@/utils/date';

export default function CheckHistory({ history }: { history: CheckHistoryType[] }) {
    return (
        <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Checks</h3>
            <ul className="space-y-3">
            {history.map((check) => (
                <li key={check.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                    {formatDate(check.checkedAt)}
                    </span>
                </div>
                <span className={`text-sm font-medium ${
                    check.newBreaches > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                    {check.newBreaches > 0 
                    ? `+${check.newBreaches} breach${check.newBreaches !== 1 ? 'es' : ''}`
                    : 'Clean'
                    }
                </span>
                </li>
            ))}
            </ul>
        </div>
  );
}
