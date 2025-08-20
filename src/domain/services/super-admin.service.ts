import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateSuperAdminDto } from 'src/application/dto/super-admin/create-super-admin.dto';
import { PrismaUserRepository } from 'src/infrastructure/persistence/prisma/prisma-user.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class SuperAdminService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async createSuperAdmin(createSuperAdminDto: CreateSuperAdminDto): Promise<UserEntity> {
    if (!createSuperAdminDto.email || !createSuperAdminDto.password) {
      throw new Error('Email and password are required');
    }
    const existingSuperAdmin = await this.userRepository.findByEmail(createSuperAdminDto.email);
    if (existingSuperAdmin) {
      throw new Error(`Super Admin with email ${createSuperAdminDto.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(createSuperAdminDto.password, 10);
    const superAdmin = await this.userRepository.create({
      ...createSuperAdminDto,
      password: hashedPassword,
      role: 'SUPER_ADMIN' as const,
      isVerified: true,
      isActive: true
    });
    console.log(`Super Admin created successfully: ${superAdmin.email}`);
    return superAdmin;
  }

  async findAllSuperAdmin(): Promise<UserEntity[]> {
    // TODO: Implement find all super admins
    const superAdmins = await this.userRepository.findAll();
    return superAdmins.filter(user => user.role === 'SUPER_ADMIN');
  }

  async findOneSuperAdmin(id: string): Promise<UserEntity | null> {
    const superAdmin = await this.userRepository.findById(id);
    return superAdmin;
  }

  async updateSuperAdmin(id: string, updateSuperAdminDetails: Partial<UserEntity>): Promise<UserEntity> {
    if (updateSuperAdminDetails.password) {
      updateSuperAdminDetails.password = await bcrypt.hash(updateSuperAdminDetails.password, 10);
    }
    const updatedSuperAdmin = await this.userRepository.update(id, { ...updateSuperAdminDetails, role: 'SUPER_ADMIN' as const });
    console.log(`Super Admin updated successfully: ${updatedSuperAdmin.email}`);
    return updatedSuperAdmin;
  }

  async deleteSuperAdmin(id: string): Promise<void> {
    const superAdmin = await this.userRepository.findById(id);
    if (!superAdmin) {
      throw new Error(`Super Admin with id ${id} not found`);
    }
    await this.userRepository.delete(id);
    console.log(`Super Admin deleted successfully: ${superAdmin.email}`);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const superAdmin = await this.userRepository.findByEmail(email);
    return superAdmin;
  }
}