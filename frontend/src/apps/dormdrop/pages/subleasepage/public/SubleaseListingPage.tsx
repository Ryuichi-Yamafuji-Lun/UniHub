import SearchFilters from "@/apps/dormdrop/components/ui/SearchFilters";
import SubleaseGrid from "@/apps/dormdrop/components/ui/SubleaseGrid";
import type { SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import type { SearchFiltersType } from "@/apps/dormdrop/types/SearchFilters";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

const SubleaseListPage = () => {
  const [allSubleases, setAllSubleases] = useState<SubleaseResponse[]>([]);
  const [filteredSubleases, setFilteredSubleases] = useState<SubleaseResponse[]>([]);
  const [filters, setFilters] = useState<SearchFiltersType>({
    leaseName: "",
    maxPrice: 30000,
    amenities: [] as SubleaseAmenity[],
    school: undefined,
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

  useEffect(() => {
    const applyFilters = () => {
      const filtered = allSubleases.filter((sublease) => {
        const matchesName =
          !filters.leaseName ||
          sublease.leaseName?.toLowerCase().includes(filters.leaseName.toLowerCase());

        const matchesPrice =
          !filters.maxPrice || sublease.leasePrice <= filters.maxPrice;

        const matchesAmenities =
          (filters.amenities ?? []).every((amenity) =>
            sublease.amenities?.includes(amenity)
          );

        const matchesSchools =
          !filters.school || sublease.school.includes(filters.school);

        return matchesName && matchesPrice && matchesAmenities && matchesSchools;
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
    });
  };

  return (
    <div className="bg-[#fef6e4] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10">
        
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