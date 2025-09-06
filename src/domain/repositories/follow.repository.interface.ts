import { FollowEntity } from '../entities/follow.entity';

export interface IFollowRepository {
  findById(id: string): Promise<FollowEntity | null>;
  findFollowers(userId: string): Promise<FollowEntity[]>;
  findFollowing(userId: string): Promise<FollowEntity[]>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  create(followerId: string, followingId: string): Promise<FollowEntity>;
  delete(followerId: string, followingId: string): Promise<void>;
  getFollowerCount(userId: string): Promise<number>;
  getFollowingCount(userId: string): Promise<number>;
}