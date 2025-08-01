import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string) => Promise<boolean>;
  register: (email: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth-token');
    toast.success('Logged out successfully');
  }, []);

  // Setup axios interceptors
  useEffect(() => {
    // Add token to all requests
    const requestInterceptorId = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Handle auth errors
    const responseInterceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && token && !loading) {
          logout();
          toast.error('Session expired. Please login again.');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptorId);
      axios.interceptors.response.eject(responseInterceptorId);
    };
  }, [token, logout]);

  // Check for existing auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('auth-token');
      if (storedToken) {
        try {
          const response = await axios.get('/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          if (response.data.valid) {
            setUser(response.data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem('auth-token');
          }
        } catch (error) {
          localStorage.removeItem('auth-token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  async function login(email: string): Promise<boolean> {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', { email });
      
      const { user: userData, token: userToken } = response.data;
      
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('auth-token', userToken);
      
      toast.success('Login successful!');
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string): Promise<boolean> {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', { email });
      
      const { user: userData, token: userToken } = response.data;
      
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('auth-token', userToken);
      
      toast.success('Registration successful!');
      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const authContextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 