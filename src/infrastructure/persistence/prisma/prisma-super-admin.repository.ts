import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { SuperAdminMapper } from '../../mappers/super-admin.mapper';
import { ISuperAdminRepository } from 'src/domain/repositories/super-admin.repository.interface';

@Injectable()
export class PrismaSuperAdminRepository implements ISuperAdminRepository{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const superAdmin = await this.prisma.superAdmin.findUnique({ 
      where: { id },
      include: { profile: true }
    });
    return superAdmin ? SuperAdminMapper.toDomain(superAdmin) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const superAdmin = await this.prisma.superAdmin.findMany({
      include: { profile: true }
    });
    return SuperAdminMapper.toDomainArray(superAdmin);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const superAdmin = await this.prisma.superAdmin.findUnique({ 
      where: { email },
      include: { profile: true }
    });
    return superAdmin ? SuperAdminMapper.toDomain(superAdmin) : null;
  }
  

  async create(superAdminData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const superAdmin = await this.prisma.superAdmin.create({ 
      data: SuperAdminMapper.toPersistence(superAdminData as UserEntity)
    });
    return SuperAdminMapper.toDomain(superAdmin);
  }

  async update(id: string, superAdminData: Partial<UserEntity>): Promise<UserEntity> {
    const superAdmin = await this.prisma.superAdmin.update({ 
      where: { id }, 
      data: SuperAdminMapper.toPersistence(superAdminData as UserEntity)
    });
    return SuperAdminMapper.toDomain(superAdmin);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.superAdmin.delete({ where: { id } });
  }
}