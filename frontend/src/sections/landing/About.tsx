import { FiUsers, FiShield, FiLayers } from "react-icons/fi";

const About = () => {
  return (
    <section id="features" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">A Marketplace You Can Trust</h2>
          <p className="mt-4 text-lg text-gray-600">We're building a safer, more convenient way for students to connect and transact.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 text-blue-600">
              <FiUsers size={28} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">By Students, For Students</h3>
            <p className="mt-2 text-gray-600">Built by students who get it. We understand the challenges of campus life and create solutions for the problems we all face.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 text-blue-600">
              <FiShield size={28} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">Built for Safety</h3>
            <p className="mt-2 text-gray-600">We prioritize your safety by building a community of verified students, so you can connect with peers you can trust.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 text-blue-600">
              <FiLayers size={28} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">Our Vision</h3>
            <p className="mt-2 text-gray-600">Starting with subleasing, our goal is to become the all-in-one platform for every aspect of student life.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;