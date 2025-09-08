import { ArtistProfile } from '../entities/artist-profile.entity';
import { CreateArtistProfileParams } from 'src/utils/types';

export interface IArtistProfileRepository {
  create(artist: CreateArtistProfileParams): Promise<ArtistProfile>;
  findByArtistId(artistId: string): Promise<ArtistProfile | null>;
  update(artistId: string, artist: Partial<ArtistProfile>): Promise<ArtistProfile>;
  delete(artistId: string): Promise<void>;
  findAll(): Promise<ArtistProfile[]>;
  findById(id: string): Promise<ArtistProfile | null>;
  updateFollowerCount(artistId: string, increment: boolean): Promise<void>;
}