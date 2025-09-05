import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { AdminMapper } from '../../mappers/admin.mapper';

@Injectable()
export class PrismaAdminRepository {
  constructor(private readonly prisma: PrismaService) {}



  async findById(id: string): Promise<UserEntity | null> {
    const admin = await this.prisma.admin.findUnique({ 
      where: { id },
      include: { profile: true }
    });
    return admin ? AdminMapper.toDomain(admin) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const admin = await this.prisma.admin.findUnique({ 
      where: { email },
      include: { profile: true }
    });
    return admin ? AdminMapper.toDomain(admin) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const admin = await this.prisma.admin.findMany({
      include: { profile: true }
    });
    return AdminMapper.toDomainArray(admin);
  }

  async create(adminData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const admin = await this.prisma.admin.create({ 
      data: AdminMapper.toPersistence(adminData as UserEntity)
    });
    return AdminMapper.toDomain(admin);
  }

  async update(id: string, adminData: Partial<UserEntity>): Promise<UserEntity> {
    const admin = await this.prisma.admin.update({ 
      where: { id }, 
      data: AdminMapper.toPersistence(adminData as UserEntity)
    });
    return AdminMapper.toDomain(admin);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.admin.delete({ where: { id } });
  }
}