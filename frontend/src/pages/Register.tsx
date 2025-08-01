import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import AuthEmailInput from '../components/auth/AuthEmailInput';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import AuthRedirect from '../components/auth/AuthRedirect';
import AuthFeatures from '../components/auth/AuthFeatures';

interface RegisterForm {
  email: string;
}

function Register() {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    const success = await registerUser(data.email.toLowerCase().trim());
    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Create your account"
        subtitle="Start monitoring your email for data breaches"
      />
      <div className="card p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AuthEmailInput register={register} error={errors.email} loading={loading} />
          <AuthSubmitButton loading={loading} text="Create account" loadingText="Creating account..." />
        </form>
        <AuthRedirect
          text="Already have an account?"
          linkText="Sign in instead"
          linkTo="/login"
        />
      </div>
      <AuthFeatures />
      <div className="text-center text-xs text-gray-500">
        <p>
          We never store your passwords and only track breach data.
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
