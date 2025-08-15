import { useState, type ChangeEvent, useRef, useEffect } from "react";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import type { SearchFiltersType } from "@/apps/dormdrop/types/SearchFilters";
import { SubleaseAmenityArray, type SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { SchoolsArray, type Schools, schoolDisplayNames } from "@/types/enums/Schools";
import { SubleaseRoomTypeArray, type SubleaseRoomType } from "@/apps/dormdrop/types/enums/SubleaseRoomType";

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
  const [isRoomTypeOpen, setRoomTypeOpen] = useState(false);
  const roomTypeRef = useRef<HTMLDivElement>(null);

  const filteredSchools = SchoolsArray.filter((school) =>
    schoolDisplayNames[school].toLowerCase().includes(schoolSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roomTypeRef.current && !roomTypeRef.current.contains(event.target as Node)) {
        setRoomTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = ["maxPrice", "numRoom", "numBath"];
    const parsedValue = numericFields.includes(name)
      ? value === "" ? undefined : parseInt(value, 10)
      : value;
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

  const handleRoomTypeToggle = (roomType: SubleaseRoomType) => {
    const current = filters.roomType || [];
    const updated = current.includes(roomType)
      ? current.filter((r) => r !== roomType)
      : [...current, roomType];
    onFilterChange({ ...filters, roomType: updated });
  };
  
  const selectedRoomTypesLabel =
    filters.roomType && filters.roomType.length > 0
      ? filters.roomType.map(formatLabel).join(", ")
      : "Select room types";

  const filterContent = (
    <div className="space-y-8 text-left">
      <div>
        <label htmlFor="leaseName" className="block text-sm font-semibold text-gray-600 mb-2">
          Lease Name
        </label>
        <input
          type="text" name="leaseName" id="leaseName" value={filters.leaseName || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base bg-white border-none rounded-lg shadow-sm focus:ring-2 focus:ring-primary-actions transition"
          placeholder="e.g., The Standard"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="maxPrice" className="text-sm font-semibold text-gray-600">
            Max Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
            <input
              type="number"
              name="maxPrice"
              id="maxPriceInput"
              value={filters.maxPrice ?? ""}
              onChange={handleInputChange}
              className="w-32 pl-7 pr-2 py-1 text-base bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-actions transition"
              placeholder="Any"
              min="100"
              max="3000"
            />
          </div>
        </div>
        <input
          type="range"
          name="maxPrice"
          id="maxPrice"
          min="100"
          max="3000"
          step="50"
          value={filters.maxPrice || 3000}
          onChange={handleInputChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primary-actions"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$100</span>
          <span>$3,000+</span>
        </div>
      </div>

      {/* School Search */}
      <div className="relative">
        <label htmlFor="school" className="block text-sm font-semibold text-gray-600 mb-2">
          School
        </label>
        <input
          type="text" value={schoolSearch} onChange={(e) => setSchoolSearch(e.target.value)}
          placeholder="Search for a school..."
          className="w-full px-4 py-3 text-base bg-white border-none rounded-lg shadow-sm focus:ring-2 focus:ring-primary-actions transition"
        />
        {schoolSearch && (
          <ul className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 w-full overflow-y-auto text-base">
            {filteredSchools.map((school) => (
              <li
                key={school} onClick={() => handleSchoolSelect(school)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {schoolDisplayNames[school]}
              </li>
            ))}
          </ul>
        )}
        {!schoolSearch && filters.school && (
          <p className="mt-2 text-sm text-gray-600">Selected: <span className="font-medium text-gray-900">{schoolDisplayNames[filters.school]}</span></p>
        )}
      </div>
      
      {/* Room Type */}
      <div className="relative" ref={roomTypeRef}>
        <label className="block text-sm font-semibold text-gray-600 mb-2">Room Type</label>
        <button
          type="button" onClick={() => setRoomTypeOpen(!isRoomTypeOpen)}
          className="w-full px-4 py-3 text-base text-left bg-white border-none rounded-lg shadow-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary-actions transition"
        >
          <span className="truncate">{selectedRoomTypesLabel}</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isRoomTypeOpen ? 'rotate-180' : ''}`} />
        </button>
        {isRoomTypeOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {SubleaseRoomTypeArray.map((rt) => (
              <li key={rt} className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer list-none" onClick={() => handleRoomTypeToggle(rt)}>
                  <input
                    type="checkbox" checked={filters.roomType?.includes(rt) ?? false} readOnly
                    className="h-4 w-4 text-primary-actions border-gray-300 rounded focus:ring-primary-actions"
                  />
                  <span className="ml-3 text-base text-gray-700">{formatLabel(rt)}</span>
              </li>
            ))}
          </div>
        )}
      </div>

      {/* Bedrooms */}
      <div>
        <label htmlFor="numRoom" className="block text-sm font-semibold text-gray-600 mb-2">
          Bedrooms
        </label>
        <input
          type="number" name="numRoom" id="numRoom" min={0} value={filters.numRoom ?? ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base bg-white border-none rounded-lg shadow-sm focus:ring-2 focus:ring-primary-actions transition"
          placeholder="e.g., 1"
        />
      </div>

      {/* Bathrooms */}
      <div>
        <label htmlFor="numBath" className="block text-sm font-semibold text-gray-600 mb-2">
          Bathrooms
        </label>
        <input
          type="number" name="numBath" id="numBath" min={0} value={filters.numBath ?? ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base bg-white border-none rounded-lg shadow-sm focus:ring-2 focus:ring-primary-actions transition"
          placeholder="e.g., 1"
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-2">Amenities</label>
        <div className="flex flex-wrap gap-3">
          {SubleaseAmenityArray.map((amenity) => {
            const isSelected = filters.amenities?.includes(amenity);
            return (
              <button
                key={amenity} type="button" onClick={() => handleAmenityToggle(amenity)}
                className={`px-4 py-2 text-base rounded-full border transition-colors ${
                  isSelected
                    ? "bg-primary-actions text-white border-transparent shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
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
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center w-full gap-2 px-4 py-3 rounded-lg bg-primary-actions text-white shadow-lg hover:bg-[#06345d] font-semibold"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
         <div className="fixed inset-0 z-40 flex">
         <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
         <div className="relative ml-auto flex flex-col w-full max-w-sm bg-white h-full shadow-xl">
           <div className="flex justify-between items-center p-4 border-b">
             <button onClick={() => setMobileOpen(false)} className="p-1 rounded-full hover:bg-gray-100"> <X className="w-6 h-6" /> </button>
             <h2 className="text-xl font-bold text-gray-900">Filters</h2>
             <button onClick={onReset} className="text-base font-semibold text-primary-actions hover:underline">Reset</button>
           </div>
           <div className="p-6 overflow-y-auto flex-1">{filterContent}</div>
           <div className="p-4 border-t bg-white">
             <button
               onClick={() => setMobileOpen(false)}
               className="w-full px-6 py-3 bg-primary-actions text-white rounded-lg hover:bg-[#06345d] text-base font-semibold"
             >
               Show Results
             </button>
           </div>
         </div>
       </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-full min-h-screen bg-[#EAEBEB] px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-left">Filters</h2>
          <button
            onClick={onReset}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
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