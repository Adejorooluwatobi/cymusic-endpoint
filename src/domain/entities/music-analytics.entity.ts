export class MusicAnalyticsEntity {
  id: string;
  musicId: string;
  playCount: number;
  likeCount: number;
  shareCount: number;
  downloadCount: number;
  lastPlayedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<MusicAnalyticsEntity>) {
    Object.assign(this, data);
  }
}