export interface UserDTO {
    username: string;
    lastName: string;
    firstName: string; // Corrected property name
    email: string;
    password: string;
    sub?: string;
  attributes: {
        profileImage: string[];
    };}
