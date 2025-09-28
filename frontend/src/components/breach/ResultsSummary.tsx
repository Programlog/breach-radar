import { AlertTriangle, Shield } from 'lucide-react';

interface ResultsSummaryProps {
  breachCount: number;
  message: string;
}

export default function ResultsSummary({ breachCount, message }: ResultsSummaryProps) {
  const hasBreaches = breachCount > 0;

  return (
    <div className={`card p-6 ${hasBreaches ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
      <div className="flex items-center space-x-3">
        {hasBreaches ? (
          <AlertTriangle className="h-8 w-8 text-red-600" />
        ) : (
          <Shield className="h-8 w-8 text-green-600" />
        )}
        <div>
          <h3 className={`text-lg font-semibold ${hasBreaches ? 'text-red-900' : 'text-green-900'}`}>
            {hasBreaches ? `${breachCount} Breach(es) Found` : 'No Breaches Found'}
          </h3>
          <p className={`${hasBreaches ? 'text-red-700' : 'text-green-700'}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
