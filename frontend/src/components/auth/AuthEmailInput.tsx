import { UseFormRegister, FieldError } from 'react-hook-form';
import { Mail } from 'lucide-react';

interface AuthEmailInputProps {
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  loading: boolean;
}

function AuthEmailInput({ register, error, loading }: AuthEmailInputProps) {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
        Email address
      </label>
      <div className="relative">
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address'
            }
          })}
          type="email"
          className="input pr-10"
          placeholder="Enter your email"
          disabled={loading}
        />
        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default AuthEmailInput;
