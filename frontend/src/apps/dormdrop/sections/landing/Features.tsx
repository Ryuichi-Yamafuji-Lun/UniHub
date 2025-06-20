// src/apps/dormdrop/components/sections/Features.tsx
import { CheckCircle } from "lucide-react";

const Features = () => {
  const features = [
    "USC Email Verification Only",
    "Post & Browse Subleases Instantly",
    "Safe, Trusted In-Person Hand-Offs",
    "Clean & Simple Chat Coming Soon",
    "Listing QR Code + Confirmation Flow",
    "Optional Payment via Stripe (future)",
  ];

  return (
    <section className="py-20 px-6 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#084479] mb-10">
          Designed for USC Students
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          DormDrop focuses on trust, simplicity, and campus exclusivity. Here’s what sets us apart:
        </p>
        <ul className="grid sm:grid-cols-2 gap-6 text-left">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <CheckCircle className="text-[#084479] mt-1" size={20} />
              <span className="text-gray-700 text-md">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Features;