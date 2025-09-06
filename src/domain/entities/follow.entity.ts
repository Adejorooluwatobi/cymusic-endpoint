export class FollowEntity {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;

  constructor(data: Partial<FollowEntity>) {
    Object.assign(this, data);
  }
}