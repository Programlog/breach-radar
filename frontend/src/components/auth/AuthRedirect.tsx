import React from 'react';
import { Link } from 'react-router-dom';

interface AuthRedirectProps {
  text: string;
  linkText: string;
  linkTo: string;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ text, linkText, linkTo }) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        {text}{' '}
        <Link
          to={linkTo}
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthRedirect;
