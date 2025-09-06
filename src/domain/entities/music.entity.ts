export class MusicEntity {
  id: string;
  title: string;
  artistId: string;
  audioFileUrl: string;
  coverImageUrl?: string;
  uploadDate: Date;
  createdAt: Date;
  updatedAt: Date;
  genreId?: string;
  duration?: number;
  quality: 'low' | 'medium' | 'high' | 'lossless';
  fileSize: number;
  isExplicit: boolean;
  isPremium: boolean;
  playCount: number;
  likeCount: number;
  shareCount: number;

  constructor(data: Partial<MusicEntity>) {
    Object.assign(this, data);
  }
}