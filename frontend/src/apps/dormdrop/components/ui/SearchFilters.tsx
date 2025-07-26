import { type ChangeEvent } from "react";
import type { SearchFiltersType } from "@/apps/dormdrop/types/SearchFilters";
import { SubleaseAmenityArray, type SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (newFilters: SearchFiltersType
  ) => void;
  onReset: () => void;
}

const SearchFilters = ({ filters, onFilterChange, onReset }: SearchFiltersProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
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

      {/* Lease Name Search */}
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

      {/* Max Price Slider */}
      <div className="mb-6">
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
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

      {/* Amenities Checkboxes */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">Amenities</h4>
        <div className="space-y-2">
          {SubleaseAmenityArray.map((amenity) => (
            <div key={amenity} className="flex items-center">
              <input
                type="checkbox"
                id={amenity}
                value={amenity}
                checked={(filters.amenities ?? []).includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor={amenity} className="ml-2 text-sm text-gray-600">
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