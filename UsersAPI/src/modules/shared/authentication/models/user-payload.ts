import type { User } from "../../../../db/entities/user.ts";

export class UserPayload {
  sub: number;
  email: string;
  roles: string[];

  public constructor(user: User) {
    this.sub = user.id;
    this.email = user.email;
    this.roles = user.roles.map((role) => role.name);
  }
}
