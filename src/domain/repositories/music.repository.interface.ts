
import { MusicEntity } from '../entities/music.entity';

export interface IMusicRepository {
  findById(id: string): Promise<MusicEntity | null>;
  findAll(): Promise<MusicEntity[]>;
  findByArtist(artistId: string): Promise<MusicEntity[]>;
  findByGenre(genreId: string): Promise<MusicEntity[]>;
  findPopular(limit?: number): Promise<MusicEntity[]>;
  findRecommended(userId: string, limit?: number): Promise<MusicEntity[]>;
  search(query: string): Promise<MusicEntity[]>;
  create(data: Omit<MusicEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<MusicEntity>;
  delete(id: string, artistId: string): Promise<void>;
  update(id: string, data: Partial<MusicEntity>): Promise<MusicEntity>;
  incrementPlayCount(id: string): Promise<void>;
  incrementLikeCount(id: string): Promise<void>;
  incrementShareCount(id: string): Promise<void>;
  addToPlaylist(musicId: string, playlistId: string): Promise<void>;
  removeFromPlaylist(musicId: string, playlistId: string): Promise<void>;
}