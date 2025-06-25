// should be the same as enums amenity in backend
export const SubleaseAmenityArray = [
    "WIFI",
    "LAUNDRY",
    "FURNISHED", 
    "AIR_CONDITIONING",
    "PET_FRIENDLY",
] as const;

export type SubleaseAmenity = typeof SubleaseAmenityArray[number];