import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from '../../infrastructure/persistence/prisma/prisma-user.repository';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async createUser(userDetails: CreateUserParams): Promise<UserEntity> {
    if (!userDetails.email || !userDetails.password) {
      throw new Error('Email and password are required');
    }
    const existingUser = await this.userRepository.findByEmail(userDetails.email);
    if (existingUser) {  
      throw new ConflictException(`User with email ${userDetails.email} already exists`);
    } 
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    const newUser = await this.userRepository.create({
      ...userDetails,
      password: hashedPassword,
      isVerified: false,
      isActive: userDetails.isActive ?? true
    });
    console.log(`User created successfully: ${newUser.email}`);
    return newUser;
  }

  async findAllUser(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOneUser(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async updateUser(id: string, updateUserDetails: UpdateUserParams): Promise<UserEntity> {
    if (updateUserDetails.password) {
      updateUserDetails.password = await bcrypt.hash(updateUserDetails.password, 10);
    }
    const updatedUser = await this.userRepository.update(id, updateUserDetails);
    console.log(`User updated successfully: ${updatedUser.email}`);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
    console.log(`User deleted successfully: ${user.email}`);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}