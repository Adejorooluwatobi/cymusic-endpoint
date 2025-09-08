import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ProfileEntity } from "src/domain/entities/profile.entity";
import { IProfileRepository } from "src/domain/repositories/profile.repository.interfce";

@Injectable()
export class PrismaProfileRepository implements IProfileRepository {
    constructor(private readonly prisma: PrismaService) {}

    private transformProfile(profile: any): ProfileEntity {
        const transformedProfile = new ProfileEntity({
            ...profile,
            user: profile.user ? {
                ...profile.user,
                password: profile.user.password ?? undefined,
                googleId: profile.user.googleId ?? undefined,
                appleId: profile.user.appleId ?? undefined
            } : undefined
        });
        
        // Set user based on priority: user > admin > superAdmin > artist
        if (profile.admin && !transformedProfile.user) transformedProfile.user = profile.admin;
        if (profile.superAdmin && !transformedProfile.user) transformedProfile.user = profile.superAdmin;
        if (profile.artist && !transformedProfile.user) transformedProfile.user = profile.artist;
        
        return transformedProfile;
    }

    async findById(id: string): Promise<ProfileEntity | null> {
        const profile = await this.prisma.profile.findUnique({ 
            where: { id },
            include: { user: true, admin: true, superAdmin: true, artist: true }
        });
        return profile ? this.transformProfile(profile) : null;
    }

    async findByEmail(email: string): Promise<ProfileEntity | null> {
        const profile = await this.prisma.profile.findFirst({
            where: {
                OR: [
                    { user: { email } },
                    { admin: { email } },
                    { superAdmin: { email } },
                    { artist: { email } }
                ]
            },
            include: { user: true, admin: true, superAdmin: true, artist: true }
        });
        return profile ? this.transformProfile(profile) : null;
    }

    async findAll(): Promise<ProfileEntity[]> {
        const profiles = await this.prisma.profile.findMany({ 
            include: { user: true, admin: true, superAdmin: true, artist: true }
        });
        return profiles.map(profile => this.transformProfile(profile));
    }

    async findByUserId(userId: string, userType: string = 'user'): Promise<ProfileEntity | null> {
        const validUserTypes = ['user', 'admin', 'superAdmin', 'artist'];
        if (!validUserTypes.includes(userType)) {
            throw new NotFoundException('Invalid user type');
        }
        
        const whereClause: Record<string, string> = {};
        const includeClause: Record<string, boolean> = {};
        
        if (userType === 'user') {
            whereClause.userId = userId;
            includeClause.user = true;
        } else if (userType === 'admin') {
            whereClause.adminId = userId;
            includeClause.admin = true;
        } else if (userType === 'superAdmin') {
            whereClause.superAdminId = userId;
            includeClause.superAdmin = true;
        } else if (userType === 'artist') {
            whereClause.artistId = userId;
            includeClause.artist = true;
        }
        
        const profile = await this.prisma.profile.findFirst({ 
            where: whereClause,
            include: includeClause
        });
        return profile ? this.transformProfile(profile) : null;
    }

    async create(profileData: any): Promise<ProfileEntity> {
        const { user: _user, admin: _admin, superAdmin: _superAdmin, artist: _artist, ...data } = profileData;
        const profile = await this.prisma.profile.create({ 
            data,
            include: { user: true, admin: true, superAdmin: true, artist: true }
        });
        return this.transformProfile(profile);
    }

    async update(id: string, profileData: Partial<Omit<ProfileEntity, 'user'>>): Promise<ProfileEntity> {
        if (!id || typeof id !== 'string') {
            throw new NotFoundException('Invalid profile ID');
        }
        const profile = await this.prisma.profile.update({ 
            where: { id }, 
            data: profileData,
            include: { user: true, admin: true, superAdmin: true, artist: true }
        });
        return this.transformProfile(profile);
    }

    async delete(id: string): Promise<void> {
        if (!id || typeof id !== 'string') {
            throw new NotFoundException('Invalid profile ID');
        }
        await this.prisma.profile.delete({ where: { id } });
    }
}