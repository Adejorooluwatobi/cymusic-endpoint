import { GenreEntity } from '../../domain/entities/genre.entity';

export class GenreMapper {
  static toDomain(prismaGenre: any): GenreEntity {
    return new GenreEntity({
      id: prismaGenre.id,
      name: prismaGenre.name,
      description: prismaGenre.description || undefined,
      createdAt: prismaGenre.createdAt,
      updatedAt: prismaGenre.updatedAt
    });
  }

  static toDomainArray(prismaGenres: any[]): GenreEntity[] {
    return prismaGenres.map(genre => this.toDomain(genre));
  }

  static toPersistence(genreEntity: Partial<GenreEntity>): any {
    return {
      name: genreEntity.name,
      description: genreEntity.description
    };
  }
}