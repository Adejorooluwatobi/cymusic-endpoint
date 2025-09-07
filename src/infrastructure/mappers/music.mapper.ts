import { MusicEntity } from '../../domain/entities/music.entity';

export class MusicMapper {
  static toDomain(prismaMusic: any): MusicEntity {
    return new MusicEntity({
      id: prismaMusic.id,
      title: prismaMusic.title,
      artistId: prismaMusic.artistId,
      audioFileUrl: prismaMusic.audioFileUrl,
      coverImageUrl: prismaMusic.coverImageUrl || undefined,
      uploadDate: prismaMusic.uploadDate,
      createdAt: prismaMusic.createdAt,
      updatedAt: prismaMusic.updatedAt,
      genreId: prismaMusic.genreId || undefined,
      duration: prismaMusic.duration ? Number(prismaMusic.duration) : undefined,
      quality: prismaMusic.quality || 'medium',
      fileSize: prismaMusic.fileSize ? Number(prismaMusic.fileSize) : undefined,
      isExplicit: prismaMusic.isExplicit || false,
      isPremium: prismaMusic.isPremium || false,
      playCount: prismaMusic.playCount || 0,
      likeCount: prismaMusic.likeCount || 0,
      shareCount: prismaMusic.shareCount || 0
    });
  }

  static toDomainArray(prismaMusics: any[]): MusicEntity[] {
    return prismaMusics.map(music => this.toDomain(music));
  }

  static toPersistence(musicEntity: Partial<MusicEntity>): any {
    const { duration, fileSize, ...data } = musicEntity;
    return {
      ...data,
      ...(duration !== undefined && { duration: String(duration) }),
      ...(fileSize !== undefined && { fileSize: String(fileSize) })
    };
  }
}