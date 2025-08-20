import { Injectable } from "@nestjs/common";
import { PrismaProfileRepository } from "src/infrastructure/persistence/prisma/prisma-profile.repository";
import { ProfileEntity } from "../entities/profile.entity";
import { CreateProfileParams } from "src/utils/types";

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepository: PrismaProfileRepository) {}

    async createProfile(profileDetails: CreateProfileParams, userId: string, userType: string): Promise<ProfileEntity> {
        const existingProfile = await this.profileRepository.findByUserId(userId, userType);
        if (existingProfile) {
            throw new Error(`Profile already exists for this user`);
        }
        const { userId: _, ...profileData } = profileDetails;
        const profileCreateData: any = { ...profileData };
        
        // Set the appropriate user ID field based on user type
        if (userType === 'user') profileCreateData.userId = userId;
        else if (userType === 'admin') profileCreateData.adminId = userId;
        else if (userType === 'superAdmin') profileCreateData.superAdminId = userId;
        else if (userType === 'artist') profileCreateData.artistId = userId;
        
        const profile = await this.profileRepository.create(profileCreateData);
        return profile;
    }

    async getProfileByUserId(userId: string, userType: string): Promise<ProfileEntity | null> {
        return this.profileRepository.findByUserId(userId, userType);
    }

    async getProfileById(id: string): Promise<ProfileEntity | null> {
        return this.profileRepository.findById(id);
    }

    async updateProfile(id: string, updateData: Partial<ProfileEntity>): Promise<ProfileEntity> {
        return this.profileRepository.update(id, updateData);
    }

    async deleteProfile(id: string): Promise<void> {
        return this.profileRepository.delete(id);
    }
}