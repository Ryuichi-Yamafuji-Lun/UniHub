export const SchoolNames = {
  USC: "University of Southern California",
  UCLA: "University of California, Los Angeles",
} as const;

export type Schools = keyof typeof SchoolNames;

export const SchoolsArray = Object.keys(SchoolNames) as Schools[];

export const schoolDisplayNames: Record<Schools, string> = SchoolNames;