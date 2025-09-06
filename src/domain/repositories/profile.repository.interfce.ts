import { ProfileEntity } from '../entities/profile.entity';

export interface IProfileRepository {
  findById(id: string): Promise<ProfileEntity | null>;
  findByEmail(email: string): Promise<ProfileEntity | null>;
  findAll(): Promise<ProfileEntity[]>;
  findByUserId(userId: string, userType: string): Promise<ProfileEntity | null>;
  create(user: Omit<ProfileEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProfileEntity>;
  update(id: string, user: Partial<ProfileEntity>): Promise<ProfileEntity>;
  delete(id: string): Promise<void>;
}