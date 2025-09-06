import { PlaylistEntity } from '../../domain/entities/playlist.entity';

export class PlaylistMapper {
  static toDomain(prismaPlaylist: any): PlaylistEntity {
    return {
      id: prismaPlaylist.id,
      userId: prismaPlaylist.userId || undefined,
      adminId: prismaPlaylist.adminId || undefined,
      superAdminId: prismaPlaylist.superAdminId || undefined,
      artistId: prismaPlaylist.artistId || undefined,
      name: prismaPlaylist.name,
      description: prismaPlaylist.description ?? null,
      createdAt: prismaPlaylist.createdAt,
      updatedAt: prismaPlaylist.updatedAt,
      playlistMusic: prismaPlaylist.playlistMusic || undefined
    };
  }

  static toDomainArray(prismaPlaylists: any[]): PlaylistEntity[] {
    return prismaPlaylists.map(playlist => this.toDomain(playlist));
  }

  static toPersistence(playlistEntity: Partial<PlaylistEntity>): any {
    const { playlistMusic: _playlistMusic, ...data } = playlistEntity;
    return data;
  }
}