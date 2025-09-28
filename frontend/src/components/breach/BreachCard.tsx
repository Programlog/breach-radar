import { Clock, CheckCircle, X } from 'lucide-react';
import DOMPurify from 'dompurify';

interface BreachData {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
}

interface BreachCardProps {
  breach: BreachData;
}

export default function BreachCard({ breach }: BreachCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDataClassColor = (dataClass: string) => {
    const sensitiveClasses = ['passwords', 'social security numbers', 'credit cards', 'phone numbers'];
    if (sensitiveClasses.some(sensitive => dataClass.toLowerCase().includes(sensitive))) {
      return 'badge-danger';
    }
    return 'badge-secondary';
  };

  return (
    <div className="card border-l-4 border-l-red-500">
      <div className="card-header">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {breach.Title || breach.Name}
              </h3>
              {breach.IsVerified ? (
                <span title="Verified breach">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </span>
              ) : (
                <span title="Unverified breach">
                  <X className="h-5 w-5 text-gray-400" />
                </span>
              )}
            </div>
            {breach.Domain && (
              <p className="text-gray-600">{breach.Domain}</p>
            )}
          </div>
          <div className="text-right text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(breach.BreachDate)}</span>
            </div>
            {breach.PwnCount && (
              <p className="mt-1">{breach.PwnCount.toLocaleString()} accounts</p>
            )}
          </div>
        </div>
      </div>

      <div className="card-content space-y-4">
        {breach.Description && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <div 
              className="text-gray-600 text-sm"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(breach.Description) }}
            />
          </div>
        )}

        {breach.DataClasses && breach.DataClasses.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Compromised Data</h4>
            <div className="flex flex-wrap gap-2">
              {breach.DataClasses.map((dataClass, idx) => (
                <span
                  key={idx}
                  className={`badge ${getDataClassColor(dataClass)}`}
                >
                  {dataClass}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
