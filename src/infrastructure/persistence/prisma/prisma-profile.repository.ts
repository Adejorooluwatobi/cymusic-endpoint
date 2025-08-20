import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ProfileEntity } from "src/domain/entities/profile.entity";

@Injectable()
export class PrismaProfileRepository {
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
        
        // Include other user types if they exist
        if (profile.admin) transformedProfile.user = profile.admin;
        if (profile.superAdmin) transformedProfile.user = profile.superAdmin;
        if (profile.artist) transformedProfile.user = profile.artist;
        
        return transformedProfile;
    }

    async findById(id: string): Promise<ProfileEntity | null> {
        const profile = await this.prisma.profile.findUnique({ 
            where: { id },
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
        const whereClause: any = {};
        const includeClause: any = {};
        
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
        const profile = await this.prisma.profile.update({ 
            where: { id }, 
            data: profileData,
            include: { user: true, admin: true, superAdmin: true, artist: true }
        });
        return this.transformProfile(profile);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.profile.delete({ where: { id } });
    }
}