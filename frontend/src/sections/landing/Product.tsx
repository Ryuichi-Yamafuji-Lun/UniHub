export default function Products() {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Products</h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore our suite of student-centric platforms.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">DormDrop</h3>
            <p className="text-gray-600">Your trusted platform for subleasing and housing, built exclusively for university students.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">CardinalCart</h3>
            <p className="text-gray-600">Buy and sell used goods with fellow students. Launching soon!</p>
          </div>
        </div>
      </div>
    </section>
  );
}