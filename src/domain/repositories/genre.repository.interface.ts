import { GenreEntity } from '../entities/genre.entity';

export interface IGenreRepository {
  findById(id: string): Promise<GenreEntity | null>;
  findAll(): Promise<GenreEntity[]>;
  findByName(name: string): Promise<GenreEntity | null>;
  create(data: Omit<GenreEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GenreEntity>;
  update(id: string, data: Partial<GenreEntity>): Promise<GenreEntity>;
  delete(id: string): Promise<void>;
}