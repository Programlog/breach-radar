import Welcome from '../components/home/Welcome';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Cta from '../components/home/CTA';

function Home() {
  return (
    <div className="space-y-16">
      <Welcome />
      <Features />
      <HowItWorks />
      <Cta />
    </div>
  );
}

export default Home;
