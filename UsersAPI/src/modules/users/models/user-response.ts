import type { User } from "../../../db/entities/user.ts";

export class UserResponse {
  id: string;
  name: string;
  email: string;
  isEmailConfirmed: boolean;
  isActive: boolean;
  avatarUrl?: string;
  registrationDate: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.isEmailConfirmed = user.isEmailConfirmed;
    this.isActive = user.isActive;
    this.avatarUrl = user.avatarUrl;
    this.registrationDate = user.registrationDate;
  }
}
