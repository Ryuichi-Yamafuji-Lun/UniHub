import SearchFilters from "@/apps/dormdrop/components/ui/SearchFilters";
import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
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
      if (!Array.isArray(allSubleases)) {
        setFilteredSubleases([]);
        return;
      }
      
      const filtered = allSubleases.filter((sublease) => {
        const matchesName = !filters.leaseName || sublease.leaseName?.toLowerCase().includes(filters.leaseName.toLowerCase());
        const matchesPrice = !filters.maxPrice || sublease.leasePrice <= filters.maxPrice;
        const matchesAmenities = (filters.amenities ?? []).every((amenity) =>
          sublease.amenities?.includes(amenity)
        );
        const matchesSchools = !filters.school || sublease.school.includes(filters.school);

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
    const resetFilters: SearchFiltersType = {
      leaseName: "",
      maxPrice: 30000,
      amenities: [],
      school: undefined,
    };
    setFilters(resetFilters);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 w-full">
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>

        {/* Sublease Grid */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
            🏠 Available Subleases
          </h1>

          {filteredSubleases.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">No subleases match your filters.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {filteredSubleases.map((sublease) => (
                <div key={sublease.id}>
                  <SubleaseCard sublease={sublease} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubleaseListPage;