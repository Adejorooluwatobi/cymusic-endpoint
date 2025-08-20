import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new UserEntity({
      ...user,
      password: user.password ?? undefined,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined
    }) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new UserEntity({
      ...user,
      password: user.password ?? undefined,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined
    }) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => new UserEntity({
      ...user,
      password: user.password ?? undefined,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined
    }));
  }

  async create(userData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const user = await this.prisma.user.create({ data: userData as any });
    return new UserEntity({
      ...user,
      password: user.password ?? undefined,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined
    });
  }

  async update(id: string, userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.prisma.user.update({ where: { id }, data: userData as any });
    return new UserEntity({
      ...user,
      password: user.password ?? undefined,
      googleId: user.googleId ?? undefined,
      appleId: user.appleId ?? undefined
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}