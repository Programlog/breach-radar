import { CheckCircle } from 'lucide-react';

const recommendations = [
  'Change your password for any affected services immediately',
  'Enable two-factor authentication where possible',
  'Monitor your accounts for suspicious activity',
  'Consider using a password manager for unique passwords'
];

export default function RecommendedActions() {
  return (
    <div className="card p-6 bg-blue-50 border-blue-200">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Recommended Actions
      </h3>
      <ul className="space-y-2 text-blue-800">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>{recommendation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
