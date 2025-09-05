export class MusicEntity {
  id: string;
  title: string;
  artistId: string;
  audioFileUrl: string;
  coverImageUrl?: string;
  uploadDate: Date;
  createdAt: Date;
  updatedAt: Date;
  genre?: string;
  duration?: number;

  constructor(data: Partial<MusicEntity>) {
    Object.assign(this, data);
  }
}