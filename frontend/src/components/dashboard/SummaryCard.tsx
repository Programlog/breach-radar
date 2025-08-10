import React from 'react';

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

export default function SummaryCard({ icon, label, value, color }: SummaryCardProps) {
    return (
        <div className="card p-6">
            <div className="flex items-center">
            <div className={`p-2 bg-${color}-100 rounded-lg`}>
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            </div>
        </div>
    );
}
