import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBg from "@/apps/dormdrop/assets/DormDropHeroBG.png";
import { SchoolsArray, type Schools, schoolDisplayNames } from "@/types/enums/Schools";

export default function DormDropLandingHero() {
  const [schoolSearch, setSchoolSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<Schools | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  const filteredSchools = SchoolsArray.filter((school) =>
    schoolDisplayNames[school].toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const handleSchoolSelect = (school: Schools) => {
    setSelectedSchool(school);
    setSchoolSearch(schoolDisplayNames[school]); 
  };

  const handleSearch = () => {
    if (selectedSchool) {
      navigate(`/dormdrop/sublease?school=${selectedSchool}`);
    } else if (schoolSearch) {
      const match = SchoolsArray.find(
        (s) => schoolDisplayNames[s].toLowerCase() === schoolSearch.toLowerCase()
      );
      if (match) {
        navigate(`/dormdrop/sublease?school=${match}`);
      } else {
        navigate("/dormdrop/sublease");
      }
    } else {
      navigate("/dormdrop/sublease");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredSchools.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredSchools.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev === 0 ? filteredSchools.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const school = filteredSchools[activeIndex];
      handleSchoolSelect(school);
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
                onChange={(e) => {
                  setSchoolSearch(e.target.value);
                  setActiveIndex(0);
                  setSelectedSchool(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search for your university..."
                className="w-full bg-transparent text-gray-700 text-lg focus:outline-none px-4"
              />
              <button
                onClick={handleSearch}
                className="bg-primary-actions text-white font-semibold rounded-full px-6 py-3 hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>

            {/* Dropdown */}
            {schoolSearch && (
              <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto text-left z-20">
                {filteredSchools.length === 0 ? (
                  <li className="px-4 py-3 text-gray-500">No schools found</li>
                ) : (
                  filteredSchools.map((school, index) => {
                    const displayName = schoolDisplayNames[school];
                    const lowerSearch = schoolSearch.toLowerCase();
                    const matchIndex = displayName
                      .toLowerCase()
                      .indexOf(lowerSearch);

                    let highlightedText;
                    if (matchIndex !== -1) {
                      highlightedText = (
                        <>
                          {displayName.slice(0, matchIndex)}
                          <span className="font-semibold text-blue-600">
                            {displayName.slice(
                              matchIndex,
                              matchIndex + lowerSearch.length
                            )}
                          </span>
                          {displayName.slice(matchIndex + lowerSearch.length)}
                        </>
                      );
                    } else {
                      highlightedText = displayName;
                    }

                    return (
                      <li
                        key={school}
                        onClick={() => handleSchoolSelect(school)}
                        className={`px-4 py-3 cursor-pointer transition-colors ${
                          index === activeIndex
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {highlightedText}
                      </li>
                    );
                  })
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}