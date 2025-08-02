import WelcomeHeader from './WelcomeHeader';
import WelcomeActions from './WelcomeActions';
import TrustIndicators from './TrustIndicators';
import WelcomeBackground from './WelcomeBackground';

export default function Welcome() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center space-y-8">
          <WelcomeHeader />
          <WelcomeActions />
          <TrustIndicators />
        </div>
      </div>
      <WelcomeBackground />
    </section>
  );
}
