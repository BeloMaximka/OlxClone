import { Roles } from "./roles.enum";

export interface DecodedToken {
  sub: string;
  roles: Roles[];
}