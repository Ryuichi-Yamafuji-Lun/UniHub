import type { Schools } from "@/types/enums/Schools";
import type { SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import type { SubleaseRoomType } from "./enums/SubleaseRoomType";

export interface SubleaseImage {
  id: number;
  imagePosition: number;
  imageUrl: string;
}

export interface SubleaseResponse {
  id: number;
  ownerId: number;
  datePosted: string;
  leaseName: string;
  leasePrice: number;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseImages: SubleaseImage[];
  roomType: SubleaseRoomType[];
  numRoom: number;
  numBath: number;
  roomWidth: number;
  roomDepth: number;
  leaseDescription: string;
  leaseAddress: string;
  longitude: number;
  latitude: number;
  amenities: SubleaseAmenity[];
  school: Schools[];
  ownerUsername: string;
  ownerProfilePicture: string;
  sumOfRatings: number;
  numberOfRatings: number;
  ownerEmail: string;
}