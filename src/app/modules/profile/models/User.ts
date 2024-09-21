import { UserRole } from "../Enum/UserRole";

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
  }
  