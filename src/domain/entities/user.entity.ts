import { Album } from './album.entity';
import { PlaylistEntity } from './playlist.entity';
import { ProfileEntity } from './profile.entity';
import { ArtistProfile } from './artist-profile.entity';
export class UserEntity {
  id: string;
  email: string;
  password?: string;
  displayName: string;
  isActive: boolean;
  isVerified: boolean;
  googleId?: string;
  appleId?: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: ProfileEntity;
  playlists?: PlaylistEntity[];
  album?: Album;
  artistProfiles?: ArtistProfile[];

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}