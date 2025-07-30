import { useState, type ChangeEvent } from "react";
import { X, SlidersHorizontal } from "lucide-react"; // nice icons
import type { SearchFiltersType } from "@/apps/dormdrop/types/SearchFilters";
import {
  SubleaseAmenityArray,
  type SubleaseAmenity,
} from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import {
  SchoolsArray,
  type Schools,
  schoolDisplayNames,
} from "@/types/enums/Schools";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (newFilters: SearchFiltersType) => void;
  onReset: () => void;
}

const formatLabel = (label: string) =>
  label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const SearchFilters = ({ filters, onFilterChange, onReset }: SearchFiltersProps) => {
  const [schoolSearch, setSchoolSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredSchools = SchoolsArray.filter((school) =>
    schoolDisplayNames[school].toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "maxPrice" ? parseInt(value) : value;
    onFilterChange({ ...filters, [name]: parsedValue });
  };

  const handleAmenityToggle = (amenity: SubleaseAmenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onFilterChange({ ...filters, amenities: updated });
  };

  const handleSchoolSelect = (school: Schools) => {
    onFilterChange({ ...filters, school });
    setSchoolSearch("");
  };

  // reusable filter form content
  const filterContent = (
    <div className="space-y-8 text-left">
      {/* Lease Name */}
      <div>
        <label htmlFor="leaseName" className="block text-base font-medium text-gray-800 mb-2">
          Lease Name
        </label>
        <input
          type="text"
          name="leaseName"
          id="leaseName"
          value={filters.leaseName || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., The Standard"
        />
      </div>

      {/* Max Price */}
      <div>
        <label htmlFor="maxPrice" className="block text-base font-medium text-gray-800 mb-2">
          Max Price: <span className="font-semibold">${filters.maxPrice || "Any"}</span>
        </label>
        <input
          type="range"
          name="maxPrice"
          id="maxPrice"
          min="100"
          max="30000"
          step="50"
          value={filters.maxPrice || 30000}
          onChange={handleInputChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>$100</span>
          <span>$30,000+</span>
        </div>
      </div>

      {/* School Search */}
      <div className="relative">
        <label htmlFor="school" className="block text-base font-medium text-gray-800 mb-2">
          School
        </label>
        <input
          type="text"
          value={schoolSearch}
          onChange={(e) => setSchoolSearch(e.target.value)}
          placeholder="Search for a school..."
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        {schoolSearch && (
          <ul className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-sm max-h-60 w-full overflow-y-auto text-base">
            {filteredSchools.length === 0 ? (
              <li className="px-4 py-2 text-gray-500">No schools found</li>
            ) : (
              filteredSchools.map((school) => (
                <li
                  key={school}
                  onClick={() => handleSchoolSelect(school)}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {schoolDisplayNames[school]}
                </li>
              ))
            )}
          </ul>
        )}
        {!schoolSearch && filters.school && (
          <p className="mt-2 text-sm text-gray-600">Selected: {schoolDisplayNames[filters.school]}</p>
        )}
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-base font-medium text-gray-800 mb-2">Amenities</label>
        <div className="flex flex-wrap gap-3">
          {SubleaseAmenityArray.map((amenity) => {
            const isSelected = filters.amenities?.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => handleAmenityToggle(amenity)}
                className={`px-4 py-2 text-base rounded-full border transition ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {formatLabel(amenity)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* backdrop */}
          <div className="fixed inset-0 bg-opacity-40" onClick={() => setMobileOpen(false)} />
          {/* drawer */}
          <div className="relative ml-auto w-80 bg-white h-full shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
              <button onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            {filterContent}
            <div className="mt-6 flex justify-between">
              <button
                onClick={onReset}
                className="text-base text-gray-500 hover:text-gray-700 underline"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-full min-h-screen bg-[#E2E6E6] px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 text-left">Filters</h2>
          <button
            onClick={onReset}
            className="text-base text-gray-500 hover:text-gray-700 underline"
          >
            Reset All
          </button>
        </div>
        {filterContent}
      </div>
    </>
  );
};

export default SearchFilters;