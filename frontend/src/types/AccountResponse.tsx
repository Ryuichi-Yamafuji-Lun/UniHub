export interface AccountResponsePublic {
  id: number;
  email: string;
  school: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; 
  profilePicture?: string;
  sumOfRatings?: number;
  numberOfRatings?: number;
  createdAt: string; 
  updatedAt: string;
}
