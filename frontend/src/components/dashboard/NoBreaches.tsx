import { Shield } from 'lucide-react';

export default function NoBreaches() {
    return (
        <div className="card p-8 text-center">
            <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Good News!
            </h3>
            <p className="text-gray-600">
            No breaches found for your email address. Your digital identity appears secure.
            </p>
        </div>
  );
}
