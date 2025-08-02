import { Link } from 'react-router-dom';
import { Shield, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Cta() {
  const { user } = useAuth();

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="card p-12 bg-gradient-to-r from-primary-600 to-indigo-600 text-white">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Take Control of Your Digital Security
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust Breach Radar to keep their digital identities safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/check"
              className="bg-white text-primary-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Check Now - It's Free</span>
            </Link>
            {!user && (
              <Link
                to="/register"
                className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
