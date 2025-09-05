import { Album } from "../entities/album.entity";

export interface IAlbumRepository {
    findById(id: string): Promise<Album | null>;
    findByUserId(userId: string): Promise<Album[]>;
    findAll(): Promise<Album[]>;
    create(album: any): Promise<Album>;
    addMusic(albumId: string, musicId: string): Promise<Album>;
    removeMusic(albumId: string, musicId: string): Promise<Album>;
    delete(id: string): Promise<void>;
}