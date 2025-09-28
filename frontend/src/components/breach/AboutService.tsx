import { ExternalLink } from 'lucide-react';

export default function AboutService() {
  return (
    <div className="mt-12 card p-6 bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        About This Service
      </h3>
      <div className="prose prose-sm text-gray-600">
        <p>
          This service uses the{' '}
          <a 
            href="https://haveibeenpwned.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary-600 hover:text-primary-700"
          >
            HaveIBeenPwned <ExternalLink className="inline h-3 w-3" />
          </a>{' '}
          database to check if your email address has been compromised in any known data breaches. 
          The database contains billions of compromised accounts from thousands of data breaches.
        </p>
        <p className="mt-2">
          <strong>Privacy:</strong> We do not store or log the email addresses you check. 
          All queries are processed securely and your data remains private.
        </p>
      </div>
    </div>
  );
}
