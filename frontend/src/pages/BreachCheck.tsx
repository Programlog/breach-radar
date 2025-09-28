import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  SearchForm, 
  ResultsSummary, 
  BreachCard, 
  RecommendedActions, 
  AboutService 
} from '../components/breach';

interface BreachData {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
}

interface BreachCheckForm {
  email: string;
}

interface BreachResults {
  email: string;
  breachCount: number;
  breaches: BreachData[];
  message: string;
}

export default function BreachCheck() {
  const [results, setResults] = useState<BreachResults | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: BreachCheckForm) => {
    setLoading(true);
    setResults(null);

    try {
      const response = await axios.post('/api/breaches/check', {
        email: data.email.toLowerCase().trim()
      });

      setResults(response.data);
      
      if (response.data.breachCount > 0) {
        toast.error(`Found ${response.data.breachCount} breach(es) for this email`);
      } else {
        toast.success('Good news! No breaches found for this email');
      }
    } catch (error: any) {
      console.error('Breach check error:', error);
      const message = error.response?.data?.message || 'Failed to check breaches';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Check Email Breaches
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Enter your email address to check if it has been compromised in any known data breaches.
        </p>
      </div>

      {/* Search Form */}
      <SearchForm onSubmit={onSubmit} loading={loading} />

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <ResultsSummary breachCount={results.breachCount} message={results.message} />

          {/* Breach Details */}
          {results.breaches && results.breaches.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Breach Details</h2>
              
              {results.breaches.map((breach, index) => (
                <BreachCard key={index} breach={breach} />
              ))}
            </div>
          )}

          {/* Recommendations */}
          {results.breachCount > 0 && <RecommendedActions />}
        </div>
      )}

      <AboutService />
    </div>
  );
}