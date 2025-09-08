import { FollowEntity } from '../entities/follow.entity';

export interface IFollowRepository {
  create(followerId: string, followingId: string): Promise<FollowEntity>;
  delete(followerId: string, followingId: string): Promise<void>;
  findFollowers(userId: string): Promise<FollowEntity[]>;
  findFollowerById(artistId: string, followerId: string): Promise<FollowEntity | null>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
}