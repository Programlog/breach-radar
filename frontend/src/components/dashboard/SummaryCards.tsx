import { AlertTriangle, CheckCircle, BarChart3, Search } from 'lucide-react';
import SummaryCard from './SummaryCard';
import { BreachSummary } from '../../types/dashboard';

export default function SummaryCards({ summary }: {summary: BreachSummary}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard
            icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
            label="Total Breaches"
            value={summary.totalBreaches}
            color="red"
            />
            <SummaryCard
            icon={<CheckCircle className="h-6 w-6 text-orange-600" />}
            label="Verified"
            value={summary.verifiedBreaches}
            color="orange"
            />
            <SummaryCard
            icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
            label="Domains"
            value={summary.domainsAffected}
            color="blue"
            />
            <SummaryCard
            icon={<Search className="h-6 w-6 text-green-600" />}
            label="Checks Run"
            value={summary.totalChecks}
            color="green"
            />
        </div>
  );
}
