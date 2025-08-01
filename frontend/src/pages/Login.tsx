import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import AuthEmailInput from '../components/auth/AuthEmailInput';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import AuthRedirect from '../components/auth/AuthRedirect';

interface LoginForm {
  email: string;
}

function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const success = await login(data.email.toLowerCase().trim());
    if (success) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to access your breach monitoring dashboard"
      />
      <div className="card p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AuthEmailInput register={register} error={errors.email} loading={loading} />
          <AuthSubmitButton loading={loading} text="Sign in" loadingText="Signing in..." />
        </form>
        <AuthRedirect
          text="Don't have an account?"
          linkText="Create one now"
          linkTo="/register"
        />
      </div>
      <div className="text-center text-xs text-gray-500">
        <p>Secure email-based authentication. No passwords required.</p>
      </div>
    </AuthLayout>
  );
};

export default Login;
