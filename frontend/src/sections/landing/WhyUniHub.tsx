export default function WhyUnihub() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Why UniHub?</h2>
        <p className="text-gray-600 text-lg mb-12">
          Built by students, for students — we understand what campus communities need.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div>
            <h4 className="text-xl font-semibold">Verified Users</h4>
            <p className="text-gray-500">Only .edu email users allowed. Trust and safety come first.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Purpose-Built Tools</h4>
            <p className="text-gray-500">Features tailored for housing, deals, and communication among students.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Community Driven</h4>
            <p className="text-gray-500">We grow based on your feedback. Shape the future of your marketplace.</p>
          </div>
        </div>
      </div>
    </section>
  );
}