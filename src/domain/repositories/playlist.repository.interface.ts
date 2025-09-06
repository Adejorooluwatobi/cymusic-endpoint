import { PlaylistEntity  } from "../entities/playlist.entity";

export interface IPlaylistRepository {
  findById(id: string): Promise<PlaylistEntity | null>;
  findByUser(userId: string): Promise<PlaylistEntity[]>;
  findAll(): Promise<PlaylistEntity[]>;
  create(playlist: Omit<PlaylistEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlaylistEntity>;
  addMusic(playlistId: string, musicId: string): Promise<PlaylistEntity>;
  removeMusic(playlistId: string, musicId: string): Promise<PlaylistEntity>;
  delete(id: string): Promise<void>;
}