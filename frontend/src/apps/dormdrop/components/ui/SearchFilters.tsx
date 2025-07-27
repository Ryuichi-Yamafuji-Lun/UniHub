import { type ChangeEvent } from "react";
import type { SearchFiltersType } from "@/apps/dormdrop/types/SearchFilters";
import { SubleaseAmenityArray, type SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { SchoolsArray, type Schools, schoolDisplayNames } from "@/types/enums/Schools";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (newFilters: SearchFiltersType) => void;
  onReset: () => void;
}

const SearchFilters = ({ filters, onFilterChange, onReset }: SearchFiltersProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "maxPrice" ? parseInt(value) : value;
    onFilterChange({ ...filters, [name]: parsedValue });
  };

  const handleAmenityChange = (amenity: SubleaseAmenity) => {
    const exists = (filters.amenities ?? []).includes(amenity);
    const updatedAmenities = exists
      ? (filters.amenities ?? []).filter((a) => a !== amenity)
      : [...(filters.amenities ?? []), amenity];

    onFilterChange({ ...filters, amenities: updatedAmenities });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">🔍 Filter Subleases</h3>

      {/* Lease Name */}
      <div className="mb-5">
        <label htmlFor="leaseName" className="block text-sm font-medium text-gray-700 mb-1">
          Lease Name
        </label>
        <input
          type="text"
          name="leaseName"
          id="leaseName"
          value={filters.leaseName || ""}
          onChange={handleInputChange}
          placeholder="e.g., The Standard"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      {/* Max Price */}
      <div className="mb-6">
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
          Max Monthly Price
        </label>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
          <span>$100</span>
          <span className="font-medium text-gray-800">${filters.maxPrice || 30000}</span>
          <span>$30,000</span>
        </div>
        <input
          type="range"
          name="maxPrice"
          id="maxPrice"
          min="100"
          max="30000"
          step="50"
          value={filters.maxPrice || 30000}
          onChange={handleInputChange}
          className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* School Dropdown */}
      <div className="mb-6">
        <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
          School
        </label>
        <select
          id="school"
          name="school"
          value={filters.school || ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              school: e.target.value === "" ? undefined : (e.target.value as Schools),
            })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          <option value="">Any</option>
          {SchoolsArray.map((school) => (
            <option key={school} value={school}>
              {schoolDisplayNames[school]}
            </option>
          ))}
        </select>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
        <div className="grid grid-cols-2 gap-2">
          {SubleaseAmenityArray.map((amenity) => (
            <label
              key={amenity}
              htmlFor={amenity}
              className="flex items-center space-x-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                id={amenity}
                checked={(filters.amenities ?? []).includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span>
                {amenity
                  .replace("_", " ")
                  .toLowerCase()
                  .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full mt-2 text-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default SearchFilters;