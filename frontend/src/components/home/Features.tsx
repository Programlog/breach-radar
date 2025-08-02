import { Search, Bell, BarChart3 } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary-600" />,
    title: 'Instant Breach Check',
    description:
      'Check any email address against millions of compromised accounts from known data breaches using the HaveIBeenPwned database.',
  },
  {
    icon: <Bell className="h-8 w-8 text-primary-600" />,
    title: 'Breach Alerts',
    description:
      'Get notified when your email appears in new data breaches. Stay ahead of potential security threats with real-time monitoring.',
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary-600" />,
    title: 'Detailed Dashboard',
    description:
      'View comprehensive breach history, timeline analysis, and security recommendations to improve your digital safety.',
  },
];

export default function Features() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Comprehensive Breach Protection</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Our platform provides you with the tools you need to stay safe in the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
