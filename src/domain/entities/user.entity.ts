export type UserRole = 'USER' | 'ADMIN' | 'ARTIST' | 'SUPER_ADMIN';

export class UserEntity {
  id: string;
  email: string;
  password?: string;
  displayName: string;
  role: UserRole;
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