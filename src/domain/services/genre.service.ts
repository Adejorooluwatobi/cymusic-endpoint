import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { GenreEntity } from '../entities/genre.entity';
import type { IGenreRepository } from '../repositories/genre.repository.interface';
import { CreateGenreParams, updateGenreParams } from 'src/utils/types';

@Injectable()
export class GenreService {
  constructor(@Inject('IGenreRepository') private readonly genreRepository: IGenreRepository) {}

  async createGenre(data: CreateGenreParams): Promise<GenreEntity> {
    const existing = await this.genreRepository.findByName(data.name);
    if (existing) {
      throw new ConflictException(`Genre ${data.name} already exists`);
    }
    return this.genreRepository.create(data);
  }

  async getAllGenres(): Promise<GenreEntity[]> {
    return this.genreRepository.findAll();
  }

  async getGenreById(id: string): Promise<GenreEntity> {
    const genre = await this.genreRepository.findById(id);
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }

  async updateGenre(id: string,data: updateGenreParams): Promise<GenreEntity> {
    await this.getGenreById(id);
    return this.genreRepository.update(id, data);
  }

  async deleteGenre(id: string): Promise<void> {
    await this.getGenreById(id);
    return this.genreRepository.delete(id);
  }
}