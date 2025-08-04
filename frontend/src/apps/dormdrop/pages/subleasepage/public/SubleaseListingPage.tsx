import SearchFilters from "@/apps/dormdrop/components/ui/SearchFilters";
import SubleaseGrid from "@/apps/dormdrop/components/ui/SubleaseGrid";
import type { SearchFiltersType } from "@/apps/dormdrop/types/SearchFilters";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type Schools } from "@/types/enums/Schools";

const SubleaseListPage = ({ initialSchool }: { initialSchool?: Schools }) => {
  const [allSubleases, setAllSubleases] = useState<SubleaseResponse[]>([]);
  const [filteredSubleases, setFilteredSubleases] = useState<SubleaseResponse[]>([]);
  
  const [searchParams] = useSearchParams();
  const schoolFromUrl = searchParams.get('school') as Schools | null;
  
  const [filters, setFilters] = useState<SearchFiltersType>({
    leaseName: "",
    maxPrice: 30000,
    amenities: [],
    school: schoolFromUrl || initialSchool,
    roomType: [],
    numRoom: undefined,
    numBath: undefined,
  });

  useEffect(() => {
    const fetchSubleases = async () => {
      try {
        const response = await api.get("/api/v1/public/subleases/all");
        setAllSubleases(response.data);
        setFilteredSubleases(response.data);
      } catch (err) {
        console.error("Error fetching subleases:", err);
      }
    };

    fetchSubleases();
  }, []);

  // Update filters when URL parameter changes
  useEffect(() => {
    if (schoolFromUrl) {
      setFilters(prev => ({
        ...prev,
        school: schoolFromUrl
      }));
    }
  }, [schoolFromUrl]);

  useEffect(() => {
    const applyFilters = () => {
      if (allSubleases.length === 0) return;

      const filtered = allSubleases.filter((sublease) => {
        const matchesName =
          !filters.leaseName ||
          sublease.leaseName?.toLowerCase().includes(filters.leaseName.toLowerCase());

        const matchesPrice =
          filters.maxPrice === undefined || sublease.leasePrice <= filters.maxPrice;

        const matchesAmenities =
          !filters.amenities ||
          filters.amenities.length === 0 ||
          filters.amenities.every((amenity) =>
            sublease.amenities?.includes(amenity)
          );

        const matchesSchools =
          !filters.school || sublease.school?.includes(filters.school);

        const matchesRoomType =
          !filters.roomType ||
          (Array.isArray(filters.roomType) && filters.roomType.length === 0) ||
          (sublease.roomType && sublease.roomType.some(rt => filters.roomType!.includes(rt)));  

        const matchesNumRoom =
          filters.numRoom === undefined || sublease.numRoom === filters.numRoom;

        const matchesNumBath =
          filters.numBath === undefined || sublease.numBath === filters.numBath;

        return (
          matchesName &&
          matchesPrice &&
          matchesAmenities &&
          matchesSchools &&
          matchesRoomType &&
          matchesNumRoom &&
          matchesNumBath
        );
      });

      setFilteredSubleases(filtered);
    };

    applyFilters();
  }, [filters, allSubleases]);

  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      leaseName: "",
      maxPrice: 30000,
      amenities: [],
      school: undefined, 
      roomType: [],
      numRoom: undefined,
      numBath: undefined,
    });
  };

  return (
    <div className="bg-[#fef6e4] min-h-screen">
      <div className="mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10">
        
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="lg:sticky lg:top-24 max-h-screen overflow-y-auto">
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Sublease Grid */}
        <div className="flex-1 overflow-y-auto max-h-screen">
          <SubleaseGrid subleases={filteredSubleases} />
        </div>
      </div>
    </div>
  );
};

export default SubleaseListPage;