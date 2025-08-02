export default function WelcomeHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
        Protect Your{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-800">
          Digital Identity
        </span>
      </h1>
      <p className="max-w-3xl mx-auto text-xl text-gray-600">
        Check if your email has been compromised in data breaches. Stay informed about cybersecurity threats
        and take control of your digital privacy with real-time breach monitoring.
      </p>
    </div>
  );
}
