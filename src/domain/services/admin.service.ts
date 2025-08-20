import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaAdminRepository } from 'src/infrastructure/persistence/prisma/prisma-admin.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateAdminParams } from 'src/utils/types';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: PrismaAdminRepository) {}

  async createAdmin(adminDetails: CreateAdminParams): Promise<UserEntity> {
    if (!adminDetails.email || !adminDetails.password) {
      throw new Error('Email and password are required');
    }
    const existingAdmin = await this.adminRepository.findByEmail(adminDetails.email);
    if (existingAdmin) {
      throw new ConflictException(`Admin with email ${adminDetails.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(adminDetails.password, 10);
    const newAdmin = await this.adminRepository.create({
      ...adminDetails,
      password: hashedPassword,
      isVerified: true,
      isActive: true,
    });
    console.log(`Admin created successfully: ${newAdmin.email}`);
    return newAdmin;
  }

  async findAllAdmin(): Promise<UserEntity[]> {
    return [];
  }

  async findOneAdmin(id: string): Promise<UserEntity | null> {
    const admin = await this.adminRepository.findById(id);
    return admin;
  }

  async updateAdmin(id: string, updateAdminDetails: Partial<UserEntity>): Promise<UserEntity> {
    if (updateAdminDetails.password) {
      updateAdminDetails.password = await bcrypt.hash(updateAdminDetails.password, 10);
    }
    const updatedAdmin = await this.adminRepository.update(id, updateAdminDetails);
    console.log(`Admin updated successfully: ${updatedAdmin.email}`);
    return updatedAdmin;
  }

  async deleteAdmin(id: string): Promise<void> {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new Error(`Admin with id ${id} not found`);
    }
    await this.adminRepository.delete(id);
    console.log(`Admin deleted successfully: ${admin.email}`);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const admin = await this.adminRepository.findByEmail(email);
    return admin;
  }
}