import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { DashboardData } from '../types/dashboard';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SummaryCards from '../components/dashboard/SummaryCards';
import QuickActions from '../components/dashboard/QuickActions';
import RecentBreaches from '../components/dashboard/RecentBreaches';
import NoBreaches from '../components/dashboard/NoBreaches';
import AccountInfo from '../components/dashboard/AccountInfo';
import CheckHistory from '../components/dashboard/CheckHistory';
import SecurityTips from '../components/dashboard/SecurityTips';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard');
      setData(response.data);
    } catch (error: any) {
      console.error('Dashboard error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      if (error.response?.status === 403) {
        toast.error('Access denied. Please check your permissions.');
      } else if (error.response?.status >= 500) {
        toast.error('Server error. Please try again later.');
      } else if (!error.response || error.response.status !== 401) {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  async function runBreachCheck() {
    if (!user?.email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error('Invalid email format.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/breaches/check', { email: user.email });
      toast.success('Breach check completed');
      await fetchDashboardData();
    } catch (error: any) {
      console.error('Breach check error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      toast.error('Failed to run breach check');
    } finally {
      setLoading(false);
    }
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <DashboardHeader />

      {data && <SummaryCards summary={data.summary} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <QuickActions onRunBreachCheck={runBreachCheck} loading={loading} />

          {data && data.recentBreaches.length > 0 && (
            <RecentBreaches breaches={data.recentBreaches} />
          )}

          {data && data.recentBreaches.length === 0 && (
            <NoBreaches />
          )}
        </div>

        <div className="space-y-6">
          {data && <AccountInfo lastCheck={data.summary.lastCheck || undefined} />}
          
          {data && data.checkHistory.length > 0 && (
            <CheckHistory history={data.checkHistory} />
          )}

          <SecurityTips />
        </div>
      </div>
    </div>
  );
};