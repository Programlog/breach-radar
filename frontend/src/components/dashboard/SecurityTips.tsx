import { CheckCircle } from 'lucide-react';

export default function SecurityTips() {
    return (
        <div className="card p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Security Tips</h3>
            <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Use unique passwords for each account</span>
                </li>
                <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Enable two-factor authentication</span>
                </li>
                <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Regularly check for breaches</span>
                </li>
                <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Monitor account activity</span>
                </li>
            </ul>
        </div>
    );
}
