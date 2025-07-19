// src/apps/dormdrop/components/sections/HowItWorks.tsx
const HowItWorks = () => {
  const steps = [
    {
      title: "1. Sign Up with Your USC Email",
      description: "Create a free account using your @usc.edu email to ensure only real Trojans join the platform.",
    },
    {
      title: "2. Browse or Post Subleases",
      description: "Explore verified listings or post your own with just a few clicks. Add photos, pricing, and availability.",
    },
    {
      title: "3. Connect & Confirm",
      description: "Message fellow students, arrange a meetup, and confirm your sublease safely with DormDrop.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#084479] mb-12">
          How DormDrop Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#084479] mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;