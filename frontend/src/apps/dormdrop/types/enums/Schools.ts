// should be the same as enums school in backend
export const SchoolsArray = [
    "USC",
    "UCLA",
] as const;

export type Schools = typeof SchoolsArray[number];