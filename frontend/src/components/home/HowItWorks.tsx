const steps = [
  {
    title: 'Enter Your Email',
    description: 'Simply type in your email address to start the breach check process.',
  },
  {
    title: 'Instant Analysis',
    description: 'Our system checks your email against millions of known breaches in seconds.',
  },
  {
    title: 'Get Results',
    description: 'Receive detailed information about any breaches and recommendations for next steps.',
  },
];

function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Get started in just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div className="text-center" key={step.title}>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
