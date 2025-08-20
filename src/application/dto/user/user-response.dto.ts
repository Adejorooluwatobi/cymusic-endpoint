// import { UserRole } from '../../../domain/entities/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  displayName: string;
  // role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}