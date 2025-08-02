import { ArrowRight } from 'lucide-react';

interface AuthSubmitButtonProps {
  loading: boolean;
  text: string;
  loadingText: string;
}

function AuthSubmitButton({ loading, text, loadingText }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center items-center py-3 px-4 bg-primary-600 text-white font-semibold rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-live="polite"
      aria-busy={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>{loadingText}</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <span>{text}</span>
          <ArrowRight className="h-5 w-5" />
        </div>
      )}
    </button>
  );
};

export default AuthSubmitButton;
