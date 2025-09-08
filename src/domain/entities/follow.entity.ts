export class FollowEntity {
  id: string;
  followerId: string; //UserId
  followingId: string; //artistId
  createdAt: Date;

  constructor(data: Partial<FollowEntity>) {
    Object.assign(this, data);
  }
}