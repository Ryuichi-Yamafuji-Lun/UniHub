// should be the same as enums school in backend
export const SchoolsArray = [
    "USC",
] as const;

export type Schools = typeof SchoolsArray[number];