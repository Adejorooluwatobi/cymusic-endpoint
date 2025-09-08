import { Album } from '../../domain/entities/album.entity';

export class AlbumMapper {
  static toDomain(prismaAlbum: any): Album {
    return {
      id: prismaAlbum.id,
      title: prismaAlbum.title,
      artistId: prismaAlbum.artistId,
      coverImageUrl: prismaAlbum.coverImageUrl || undefined,
      releaseDate: prismaAlbum.releaseDate,
      createdAt: prismaAlbum.createdAt,
      updatedAt: prismaAlbum.updatedAt,
      albumMusic: prismaAlbum.albumMusic || undefined
    };
  }

  static toDomainArray(prismaAlbums: any[]): Album[] {
    return prismaAlbums.map(album => this.toDomain(album));
  }

  static toPersistence(albumEntity: Partial<Album>): any {
    const { albumMusic: _albumMusic, ...data } = albumEntity;
    return data;
  }
}