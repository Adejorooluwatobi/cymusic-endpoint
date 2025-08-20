import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateSuperAdminDto } from 'src/application/dto/super-admin/create-super-admin.dto';
import { PrismaSuperAdminRepository } from 'src/infrastructure/persistence/prisma/prisma-super-admin.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class SuperAdminService {
  constructor(private readonly superAdminRepository: PrismaSuperAdminRepository) {}

  async createSuperAdmin(createSuperAdminDto: CreateSuperAdminDto): Promise<UserEntity> {
    if (!createSuperAdminDto.email || !createSuperAdminDto.password) {
      throw new Error('Email and password are required');
    }
    const existingSuperAdmin = await this.superAdminRepository.findByEmail(createSuperAdminDto.email);
    if (existingSuperAdmin) {
      throw new Error(`Super Admin with email ${createSuperAdminDto.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(createSuperAdminDto.password, 10);
    const superAdmin = await this.superAdminRepository.create({
      ...createSuperAdminDto,
      password: hashedPassword,
      isVerified: true,
      isActive: true
    });
    console.log(`Super Admin created successfully: ${superAdmin.email}`);
    return superAdmin;
  }

  async findAllSuperAdmin(): Promise<UserEntity[]> {
    return [];
  }

  async findOneSuperAdmin(id: string): Promise<UserEntity | null> {
    const superAdmin = await this.superAdminRepository.findById(id);
    return superAdmin;
  }

  async updateSuperAdmin(id: string, updateSuperAdminDetails: Partial<UserEntity>): Promise<UserEntity> {
    if (updateSuperAdminDetails.password) {
      updateSuperAdminDetails.password = await bcrypt.hash(updateSuperAdminDetails.password, 10);
    }
    const updatedSuperAdmin = await this.superAdminRepository.update(id, updateSuperAdminDetails);
    console.log(`Super Admin updated successfully: ${updatedSuperAdmin.email}`);
    return updatedSuperAdmin;
  }

  async deleteSuperAdmin(id: string): Promise<void> {
    const superAdmin = await this.superAdminRepository.findById(id);
    if (!superAdmin) {
      throw new Error(`Super Admin with id ${id} not found`);
    }
    await this.superAdminRepository.delete(id);
    console.log(`Super Admin deleted successfully: ${superAdmin.email}`);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const superAdmin = await this.superAdminRepository.findByEmail(email);
    return superAdmin;
  }
}