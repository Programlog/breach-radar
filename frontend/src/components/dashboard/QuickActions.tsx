import { Search } from 'lucide-react';

interface QuickActionsProps {
  onRunBreachCheck: () => void;
  loading: boolean;
}

export default function QuickActions({ onRunBreachCheck, loading }: QuickActionsProps) {
    return (
        <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={onRunBreachCheck}
                disabled={loading}
                className="btn btn-primary px-6 py-3 disabled:opacity-50"
            >
                {loading ? (
                <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Checking...</span>
                </div>
                ) : (
                <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Run Breach Check</span>
                </div>
                )}
            </button>
            </div>
        </div>
  );
}
