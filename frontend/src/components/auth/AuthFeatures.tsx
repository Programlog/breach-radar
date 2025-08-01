import { CheckCircle } from 'lucide-react';

const features = [
  "Real-time breach monitoring",
  "Detailed breach history dashboard",
  "Email alerts for new breaches",
  "Security recommendations"
];

function AuthFeatures() {
  return (
    <div className="card p-6 bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        What you'll get:
      </h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthFeatures;
