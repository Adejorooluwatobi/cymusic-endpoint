import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { FollowEntity } from '../entities/follow.entity';
import type { IFollowRepository } from '../repositories/follow.repository.interface';

@Injectable()
export class FollowService {
  constructor(@Inject('IFollowRepository') private readonly followRepository: IFollowRepository) {}

  async followUser(followerId: string, followingId: string): Promise<FollowEntity> {
    if (followerId === followingId) {
      throw new ConflictException('Cannot follow yourself');
    }
    
    const isAlreadyFollowing = await this.followRepository.isFollowing(followerId, followingId);
    if (isAlreadyFollowing) {
      throw new ConflictException('Already following this user');
    }
    
    return this.followRepository.create(followerId, followingId);
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    const isFollowing = await this.followRepository.isFollowing(followerId, followingId);
    if (!isFollowing) {
      throw new NotFoundException('Not following this user');
    }
    
    return this.followRepository.delete(followerId, followingId);
  }

  async getFollowers(userId: string): Promise<FollowEntity[]> {
    return this.followRepository.findFollowers(userId);
  }

  async getFollowing(userId: string): Promise<FollowEntity[]> {
    return this.followRepository.findFollowing(userId);
  }

  async getFollowerCount(userId: string): Promise<number> {
    return this.followRepository.getFollowerCount(userId);
  }

  async getFollowingCount(userId: string): Promise<number> {
    return this.followRepository.getFollowingCount(userId);
  }
}