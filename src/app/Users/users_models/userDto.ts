import { UserDetails } from "./userdetails";

export interface UserDto {
    id: string;
    username: string;
    email: string;
    userDetails?: UserDetails;
  }