import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class PrismaSuperAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const superAdmin = await this.prisma.superAdmin.findUnique({ where: { id } });
    return superAdmin ? new UserEntity({
      ...superAdmin,
      password: superAdmin.password ?? undefined
    }) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const superAdmin = await this.prisma.superAdmin.findUnique({ where: { email } });
    return superAdmin ? new UserEntity({
      ...superAdmin,
      password: superAdmin.password ?? undefined
    }) : null;
  }

  async create(superAdminData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const superAdmin = await this.prisma.superAdmin.create({ data: superAdminData as any });
    return new UserEntity({
      ...superAdmin,
      password: superAdmin.password ?? undefined
    });
  }

  async update(id: string, superAdminData: Partial<UserEntity>): Promise<UserEntity> {
    const superAdmin = await this.prisma.superAdmin.update({ where: { id }, data: superAdminData as any });
    return new UserEntity({
      ...superAdmin,
      password: superAdmin.password ?? undefined
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.superAdmin.delete({ where: { id } });
  }
}