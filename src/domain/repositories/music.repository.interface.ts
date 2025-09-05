
import { MusicEntity } from '../entities/music.entity';

export interface IMusicRepository {
  findById(id: string): Promise<MusicEntity | null>;
    findAll(): Promise<MusicEntity[]>;
    findByArtist(artistId: string): Promise<MusicEntity[]>;
    create(data: Omit<MusicEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<MusicEntity>;
    delete(id: string, artistId: string): Promise<void>;
    update(id: string, data: Partial<MusicEntity>): Promise<MusicEntity>;
    findByUserId(userId: string): Promise<MusicEntity[]>;
    addToPlaylist(musicId: string, playlistId: string): Promise<MusicEntity>;
    removeFromPlaylist(musicId: string, playlistId: string): Promise<MusicEntity>;
}