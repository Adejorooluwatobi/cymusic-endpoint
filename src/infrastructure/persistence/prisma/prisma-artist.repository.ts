import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { ProfileEntity } from '../../../domain/entities/profile.entity';

@Injectable()
export class PrismaArtistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const artist = await this.prisma.artist.findUnique({ 
      where: { id },
      include: { profile: true }
    });
    return artist ? new UserEntity({
      ...artist,
      password: artist.password ?? undefined,
      googleId: artist.googleId ?? undefined,
      appleId: artist.appleId ?? undefined,
      profile: artist.profile ? new ProfileEntity({
        ...artist.profile,
        userId: artist.profile.userId ?? undefined,
        adminId: artist.profile.adminId ?? undefined,
        superAdminId: artist.profile.superAdminId ?? undefined,
        artistId: artist.profile.artistId ?? undefined
      }) : undefined
    }) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const artist = await this.prisma.artist.findUnique({ 
      where: { email },
      include: { profile: true }
    });
    return artist ? new UserEntity({
      ...artist,
      password: artist.password ?? undefined,
      googleId: artist.googleId ?? undefined,
      appleId: artist.appleId ?? undefined,
      profile: artist.profile ? new ProfileEntity({
        ...artist.profile,
        userId: artist.profile.userId ?? undefined,
        adminId: artist.profile.adminId ?? undefined,
        superAdminId: artist.profile.superAdminId ?? undefined,
        artistId: artist.profile.artistId ?? undefined
      }) : undefined
    }) : null;
  }

  async create(artistData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const { email, password, displayName, isActive, isVerified, googleId, appleId } = artistData;
    const artist = await this.prisma.artist.create({ 
      data: { email, password, displayName, isActive, isVerified, googleId, appleId }
    });
    return new UserEntity({
      id: artist.id,
      email: artist.email,
      password: artist.password ?? undefined,
      displayName: artist.displayName,
      isActive: artist.isActive,
      isVerified: artist.isVerified,
      googleId: artist.googleId ?? undefined,
      appleId: artist.appleId ?? undefined,
      createdAt: artist.createdAt,
      updatedAt: artist.updatedAt
    });
  }

  async update(id: string, artistData: Partial<UserEntity>): Promise<UserEntity> {
    const { email, password, displayName, isActive, isVerified, googleId, appleId } = artistData;
    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    if (googleId !== undefined) updateData.googleId = googleId;
    if (appleId !== undefined) updateData.appleId = appleId;
    
    const artist = await this.prisma.artist.update({ where: { id }, data: updateData });
    return new UserEntity({
      id: artist.id,
      email: artist.email,
      password: artist.password ?? undefined,
      displayName: artist.displayName,
      isActive: artist.isActive,
      isVerified: artist.isVerified,
      googleId: artist.googleId ?? undefined,
      appleId: artist.appleId ?? undefined,
      createdAt: artist.createdAt,
      updatedAt: artist.updatedAt
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.artist.delete({ where: { id } });
  }
}