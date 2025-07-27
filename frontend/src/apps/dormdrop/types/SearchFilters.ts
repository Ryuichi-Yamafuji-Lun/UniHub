import type { SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import type { Schools } from "@/types/enums/Schools";

export interface SearchFiltersType {
  leaseName?: string;
  maxPrice?: number;
  amenities?: SubleaseAmenity[];
  school?: Schools;
}