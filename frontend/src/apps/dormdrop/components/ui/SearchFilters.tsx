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
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Filters</h3>

      {/* Lease Name */}
      <div className="mb-6">
        <label htmlFor="leaseName" className="block text-sm font-medium text-gray-700 mb-1">
          Lease Name
        </label>
        <input
          type="text"
          name="leaseName"
          id="leaseName"
          value={filters.leaseName || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., The Standard"
        />
      </div>

      {/* Max Price */}
      <div className="mb-6">
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
          Max Price: ${filters.maxPrice || "Any"}
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
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* School Dropdown (Single Select) */}
      <div className="mb-6">
        <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
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
        <h4 className="text-md font-semibold text-gray-700 mb-2">Amenities</h4>
        <div className="space-y-2">
          {SubleaseAmenityArray.map((amenity) => (
            <div key={amenity} className="flex items-center">
              <input
                type="checkbox"
                id={amenity}
                checked={(filters.amenities ?? []).includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor={amenity} className="ml-2 text-sm text-gray-600 capitalize">
                {amenity.replace("_", " ").toLowerCase().replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default SearchFilters;