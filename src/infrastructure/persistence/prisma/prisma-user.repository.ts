import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}



  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      include: { profile: true }
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      include: { profile: true }
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      include: { profile: true }
    });
    return UserMapper.toDomainArray(users);
  }

  async create(userData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const user = await this.prisma.user.create({ 
      data: UserMapper.toPersistence(userData as UserEntity)
    });
    return UserMapper.toDomain(user);
  }

  async update(id: string, userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.prisma.user.update({ 
      where: { id }, 
      data: UserMapper.toPersistence(userData as UserEntity)
    });
    return UserMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}