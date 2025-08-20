export class UserEntity {
  id: string;
  email: string;
  password?: string;
  displayName: string;
  isActive: boolean;
  isVerified: boolean;
  googleId?: string;
  appleId?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}