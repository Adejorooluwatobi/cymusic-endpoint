import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class PrismaAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    return admin ? new UserEntity({
      ...admin,
      password: admin.password ?? undefined
    }) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    return admin ? new UserEntity({
      ...admin,
      password: admin.password ?? undefined
    }) : null;
  }

  async create(adminData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const admin = await this.prisma.admin.create({ data: adminData as any });
    return new UserEntity({
      ...admin,
      password: admin.password ?? undefined
    });
  }

  async update(id: string, adminData: Partial<UserEntity>): Promise<UserEntity> {
    const admin = await this.prisma.admin.update({ where: { id }, data: adminData as any });
    return new UserEntity({
      ...admin,
      password: admin.password ?? undefined
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.admin.delete({ where: { id } });
  }
}