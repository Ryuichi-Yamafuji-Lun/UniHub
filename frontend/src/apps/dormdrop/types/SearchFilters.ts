import type { SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";

export interface SearchFiltersType {
  leaseName?: string;
  maxPrice?: number;
  amenities?: SubleaseAmenity[];
}