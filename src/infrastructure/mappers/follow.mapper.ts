import { FollowEntity } from '../../domain/entities/follow.entity';

export class FollowMapper {
  static toDomain(prismaFollow: any): FollowEntity {
    return new FollowEntity({
      id: prismaFollow.id,
      followerId: prismaFollow.followerId,
      followingId: prismaFollow.followingId,
      createdAt: prismaFollow.createdAt
    });
  }

  static toDomainArray(prismaFollows: any[]): FollowEntity[] {
    return prismaFollows.map(follow => this.toDomain(follow));
  }

  static toPersistence(followEntity: Partial<FollowEntity>): any {
    return {
      followerId: followEntity.followerId,
      followingId: followEntity.followingId
    };
  }
}