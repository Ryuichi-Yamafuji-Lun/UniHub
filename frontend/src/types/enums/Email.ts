const ALLOWED_EMAIL_DOMAINS = [
    "usc.edu", 
    "ucla.edu",
];


export const isAllowedEmail = (email: string): boolean => {
  const domain = email.split("@")[1];
  return ALLOWED_EMAIL_DOMAINS.includes(domain);
};