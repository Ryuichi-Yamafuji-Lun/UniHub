export const SubleaseAmenity = {
  WIFI: "WIFI",
  LAUNDRY: "LAUNDRY",
  FURNISHED: "FURNISHED",
  AIR_CONDITIONING: "AIR_CONDITIONING",
  PET_FRIENDLY: "PET_FRIENDLY",
} as const;

export type SubleaseAmenity = keyof typeof SubleaseAmenity;

export const Schools = {
  USC: "USC",

} as const;

export type Schools = keyof typeof Schools;

export interface SubleaseResponse {
  id: number;
  ownerId: number;
  datePosted: string;
  leaseName: string;
  leasePrice: number;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseImage: string;
  roomType: string;
  roomWidth: number;
  roomDepth: number;
  leaseDescription: string;
  leaseAddress: string;
  longitude: number;
  latitude: number;
  amenities: SubleaseAmenity[];
  school: Schools;
  ownerUsername: string;
  ownerProfilePicture: string;
  sumOfRatings: number;
  numberOfRatings: number;
  ownerEmail: string;
}