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
      className="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
