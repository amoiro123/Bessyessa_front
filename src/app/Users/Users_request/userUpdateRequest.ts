export interface UserUpdateRequest {
    id: string;
    username?: string;
    password?: string;
    userDetails?: UserDetails;
  }
  
  export interface UserDetails {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
    aboutMe: string;
    profilePicture: string;
  }
  