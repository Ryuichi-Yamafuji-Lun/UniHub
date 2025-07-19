// Should match the enum displayName values from the backend
export const SchoolsArray = [
  "USC",
  "UCLA",
] as const;

export type Schools = typeof SchoolsArray[number];

export const schoolDisplayNames: Record<Schools, string> = {
  USC: "University of Southern California",
  UCLA: "University of California, Los Angeles",
};