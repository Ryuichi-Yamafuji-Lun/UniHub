// should be the same as enums amenity in backend
export const SubleaseRoomTypeArray = [
    "ENTIRE_PLACE",
    "PRIVATE_ROOM",
    "SHARED_ROOM", 
] as const;

export type SubleaseRoomType = typeof SubleaseRoomTypeArray[number];