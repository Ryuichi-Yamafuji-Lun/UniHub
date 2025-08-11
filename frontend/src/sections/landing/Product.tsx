const Product = () => {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Explore UniHub</h2>
          <p className="mt-3 text-lg text-gray-600">Find what you need, right on campus.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dormdrop Card (Active) */}
          <a href="/dormdrop" className="category-card block bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Dormdrop</h3>
              <p className="mt-2 text-gray-600">Find your perfect home away from home. Browse student subleases and short-term rentals near your university.</p>
            </div>
            <div className="px-8 py-4 bg-gray-50 font-semibold text-blue-600">
              Find a Sublease &rarr;
            </div>
          </a>
          {/* Furniture Card (Coming Soon) */}
          <div className="category-card block bg-white rounded-xl shadow-md overflow-hidden opacity-60 cursor-not-allowed">
            <div className="p-8">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 13-1-5 4 4-1 5"/><path d="M2 13h4"/><path d="M18 13h4"/><path d="M11.3 13a3 3 0 0 1-3.3-3H5a3 3 0 0 1 3.3 3Z"/><path d="M12.7 13a3 3 0 0 0 3.3-3H19a3 3 0 0 0-3.3 3Z"/><path d="M8 13h8v8H8z"/><path d="M10 21v-8"/><path d="M14 21v-8"/></svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Furniture</h3>
              <p className="mt-2 text-gray-600">Buy and sell used furniture. Perfect for furnishing your dorm or apartment without breaking the bank.</p>
            </div>
            <div className="px-8 py-4 bg-gray-50 font-semibold text-gray-500">
              Coming Soon
            </div>
          </div>
          {/* Student Thrift Card (Coming Soon) */}
          <div className="category-card block bg-white rounded-xl shadow-md overflow-hidden opacity-60 cursor-not-allowed">
            <div className="p-8">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Student Thrift</h3>
              <p className="mt-2 text-gray-600">Discover unique finds from fellow students. A marketplace for clothes, textbooks, and everyday essentials.</p>
            </div>
            <div className="px-8 py-4 bg-gray-50 font-semibold text-gray-500">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;