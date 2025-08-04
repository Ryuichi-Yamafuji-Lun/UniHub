import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBg from "@/apps/dormdrop/assets/DormDropHeroBG.png";
import { SchoolsArray, type Schools, schoolDisplayNames } from "@/types/enums/Schools";

export default function DormDropLandingHero() {
  const [schoolSearch, setSchoolSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<Schools | null>(null);
  
  const navigate = useNavigate();

  const filteredSchools = SchoolsArray.filter((school) =>
    schoolDisplayNames[school].toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const handleSchoolSelect = (school: Schools) => {
    setSelectedSchool(school);
    setSchoolSearch("");
  };

  const handleSearch = () => {
    if (selectedSchool) {
      navigate(`/dormdrop/sublease?school=${selectedSchool}`);
    } else {
      navigate('/dormdrop/sublease');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-primary-bg">
      <div
        className="relative w-full flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "500px",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Centered content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
            Find your home away from home
          </h1>

          {/* Search */}
          <div className="relative">
            <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
              <input
                type="text"
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for your university..."
                className="w-full bg-transparent text-gray-700 text-lg focus:outline-none px-4"
              />
              <button 
                onClick={handleSearch}
                className="bg-[#007AFF] text-white font-semibold rounded-full px-6 py-3 hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>

            {/* Dropdown */}
            {schoolSearch && (
              <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto text-left z-20">
                {filteredSchools.length === 0 ? (
                  <li className="px-4 py-2 text-gray-500">No schools found</li>
                ) : (
                  filteredSchools.map((school) => (
                    <li
                      key={school}
                      onClick={() => handleSchoolSelect(school)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {schoolDisplayNames[school]}
                    </li>
                  ))
                )}
              </ul>
            )}

            {/* Selected school */}
            {!schoolSearch && selectedSchool && (
              <p className="mt-3 text-white text-lg font-medium">
                Selected: {schoolDisplayNames[selectedSchool]}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}