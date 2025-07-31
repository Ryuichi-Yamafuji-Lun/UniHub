import type { SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import type { Schools } from "@/types/enums/Schools";
import type { SubleaseRoomType } from "./enums/SubleaseRoomType";

export interface SearchFiltersType {
  leaseName?: string;
  maxPrice?: number;
  amenities?: SubleaseAmenity[];
  school?: Schools;
  roomType?: SubleaseRoomType[];
  numRoom?: number;
  numBath?: number;
}