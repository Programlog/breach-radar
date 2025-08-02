import { Shield, CheckCircle, BarChart3 } from 'lucide-react';

export default function TrustIndicators() {
  return (
    <div className="pt-8">
      <p className="text-sm text-gray-500 mb-4">Trusted by security professionals</p>
      <div className="flex items-center justify-center space-x-8 text-gray-400">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span className="text-sm">HIBP Verified</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm">Privacy First</span>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span className="text-sm">Real-time Updates</span>
        </div>
      </div>
    </div>
  );
}
