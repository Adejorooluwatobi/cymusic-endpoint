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
      genre: prismaMusic.genre || undefined,
      duration: prismaMusic.duration ? Number(prismaMusic.duration) : undefined
    });
  }

  static toDomainArray(prismaMusics: any[]): MusicEntity[] {
    return prismaMusics.map(music => this.toDomain(music));
  }

  static toPersistence(musicEntity: Partial<MusicEntity>): any {
    const { duration, ...data } = musicEntity;
    return {
      ...data,
      ...(duration !== undefined && { duration: String(duration) })
    };
  }
}