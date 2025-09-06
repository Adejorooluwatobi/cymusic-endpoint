export class LikeEntity {
  id: string;
  musicId: string;
  userId: string;
  createdAt: Date;

  constructor(data: Partial<LikeEntity>) {
    Object.assign(this, data);
  }
}