import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IFollowRepository } from '../../../domain/repositories/follow.repository.interface';
import { FollowEntity } from '../../../domain/entities/follow.entity';
import { FollowMapper } from '../../mappers/follow.mapper';

@Injectable()
export class PrismaFollowRepository implements IFollowRepository {
  constructor(private prisma: PrismaService) {}

  async create(followerId: string, followingId: string): Promise<FollowEntity> {
    const follow = await this.prisma.follow.create({
      data: { followerId, followingId }
    });
    return FollowMapper.toDomain(follow);
  }

  async delete(followerId: string, followingId: string): Promise<void> {
    await this.prisma.follow.deleteMany({
      where: { followerId, followingId }
    });
  }

  async findFollowers(userId: string): Promise<FollowEntity[]> {
    const follows = await this.prisma.follow.findMany({
      where: { followingId: userId }
    });
    return follows.map(follow => FollowMapper.toDomain(follow));
  }

  async findFollowerById(artistId: string, followerId: string): Promise<FollowEntity | null> {
    const follow = await this.prisma.follow.findFirst({
      where: { followingId: artistId, followerId }
    });
    return follow ? FollowMapper.toDomain(follow) : null;
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await this.prisma.follow.findFirst({
      where: { followerId, followingId }
    });
    return !!follow;
  }
}