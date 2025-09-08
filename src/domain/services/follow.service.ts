import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { FollowEntity } from '../entities/follow.entity';
import type { IFollowRepository } from '../repositories/follow.repository.interface';
import type { IArtistProfileRepository } from '../repositories/artist-profile.repository.interface';

@Injectable()
export class FollowService {
  constructor(
    @Inject('IFollowRepository') private readonly followRepository: IFollowRepository,
    @Inject('IArtistProfileRepository') private readonly artistProfileRepository: IArtistProfileRepository
  ) {}

  async followUser(followerId: string, followingId: string): Promise<FollowEntity> {
    if (followerId === followingId) {
      throw new ConflictException('Cannot follow yourself');
    }
    
    const isAlreadyFollowing = await this.followRepository.isFollowing(followerId, followingId);
    if (isAlreadyFollowing) {
      throw new ConflictException('Already following this user');
    }
    
    const follow = await this.followRepository.create(followerId, followingId);
    
    // Increment follower count in artist profile
    await this.artistProfileRepository.updateFollowerCount(followingId, true);
    
    return follow;
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    const isFollowing = await this.followRepository.isFollowing(followerId, followingId);
    if (!isFollowing) {
      throw new NotFoundException('Not following this user');
    }
    
    await this.followRepository.delete(followerId, followingId);
    
    // Decrement follower count in artist profile
    await this.artistProfileRepository.updateFollowerCount(followingId, false);
  }

  async getFollowers(userId: string): Promise<FollowEntity[]> {
    return this.followRepository.findFollowers(userId);
  }

  async getFollowerById(artistId: string, followerId: string): Promise<FollowEntity> {
    const follower = await this.followRepository.findFollowerById(artistId, followerId);
    if (!follower) {
      throw new NotFoundException('Follower not found');
    }
    return follower;
  }
}