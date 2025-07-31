import type { Schools } from "@/types/enums/Schools";
import type { SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import type { SubleaseRoomType } from "./enums/SubleaseRoomType";

// 1. Create DTO
export interface SubleaseCreateDTO {
  leaseName: string;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseSchool: Schools[];
  amenities: SubleaseAmenity[];
  leasePrice: number;
  roomType: SubleaseRoomType[];
  numRoom: number;
  numBath: number;
  roomWidth: number;
  roomDepth: number;
  leaseImage: string;
  leaseDescription: string;
  leaseAddress: string;
  latitude: number;
  longitude: number;
}

// 2. Update DTO
export type SubleaseUpdateDTO = SubleaseCreateDTO;

// 3. Response DTO
export interface SubleaseResponseDTO extends SubleaseCreateDTO {
  id: number;
  datePosted: string;
  school: Schools[];

  ownerId: number;
  ownerUsername: string;
  ownerProfilePicture: string;
  sumOfRatings: number;
  numberOfRatings: number;
  ownerEmail: string;
}