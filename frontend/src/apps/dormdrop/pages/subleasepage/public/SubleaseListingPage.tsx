import SearchFilters from "@/apps/dormdrop/components/ui/SearchFilters";
import SubleaseGrid from "@/apps/dormdrop/components/ui/SubleaseGrid";
import type { SearchFiltersType } from "@/apps/dormdrop/types/SearchFilters";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type Schools } from "@/types/enums/Schools";

const SubleaseListPage = ({ initialSchool }: { initialSchool?: Schools }) => {
  // --- All of your existing state and useEffect hooks remain the same ---
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
        // Safeguard to ensure we always have an array
        const data = Array.isArray(response.data) ? response.data : [];
        setAllSubleases(data);
        setFilteredSubleases(data);
      } catch (err) {
        console.error("Error fetching subleases:", err);
      }
    };
    fetchSubleases();
  }, []);

  useEffect(() => {
    if (schoolFromUrl) {
      setFilters(prev => ({ ...prev, school: schoolFromUrl }));
    }
  }, [schoolFromUrl]);

  useEffect(() => {
    const applyFilters = () => {
      if (!Array.isArray(allSubleases)) return;
      const filtered = allSubleases.filter((sublease) => {
        const { leaseName, maxPrice, amenities, school, roomType, numRoom, numBath } = filters;
        return (
          (!leaseName || sublease.leaseName?.toLowerCase().includes(leaseName.toLowerCase())) &&
          (maxPrice === undefined || sublease.leasePrice <= maxPrice) &&
          (!amenities || amenities.length === 0 || amenities.every((a) => sublease.amenities?.includes(a))) &&
          (!school || sublease.school?.includes(school)) &&
          (!roomType || roomType.length === 0 || sublease.roomType?.some(rt => roomType.includes(rt))) &&
          (numRoom === undefined || sublease.numRoom === numRoom) &&
          (numBath === undefined || sublease.numBath === numBath)
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
      leaseName: "", maxPrice: 30000, amenities: [], school: undefined, 
      roomType: [], numRoom: undefined, numBath: undefined,
    });
  };

  return (
    <div className="lg:flex lg:h-screen lg:overflow-hidden">
      
      {/* --- Left Panel (Filters) --- */}
      <aside className="hidden lg:block lg:w-1/4 bg-[#EAEBEB] p-6 overflow-y-auto">
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </aside>

      {/* --- Right Panel (Grid) --- */}
      <main className="flex-1 p-6 lg:overflow-y-auto">
        {/* Mobile-only: Show a button to open the filter drawer */}
        <div className="lg:hidden mb-4">
           <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
        </div>
        <SubleaseGrid subleases={filteredSubleases} />
      </main>
    </div>
  );
};

export default SubleaseListPage;