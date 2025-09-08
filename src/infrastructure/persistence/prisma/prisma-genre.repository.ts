import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IGenreRepository } from '../../../domain/repositories/genre.repository.interface';
import { GenreEntity } from '../../../domain/entities/genre.entity';
import { GenreMapper } from '../../mappers/genre.mapper';

@Injectable()
export class PrismaGenreRepository implements IGenreRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<GenreEntity | null> {
    const genre = await this.prisma.genre.findUnique({
      where: { id }
    });
    return genre ? GenreMapper.toDomain(genre) : null;
  }

  async findAll(): Promise<GenreEntity[]> {
    const genres = await this.prisma.genre.findMany();
    return genres.map(genre => GenreMapper.toDomain(genre));
  }

  async findByName(name: string): Promise<GenreEntity | null> {
    const genre = await this.prisma.genre.findFirst({
      where: { name }
    });
    return genre ? GenreMapper.toDomain(genre) : null;
  }

  async create(data: Omit<GenreEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GenreEntity> {
    const genre = await this.prisma.genre.create({
      data: GenreMapper.toPersistence(data)
    });
    return GenreMapper.toDomain(genre)
  }

  async update(id: string, data: Partial<GenreEntity>): Promise<GenreEntity> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid genre ID');
    }
    const genre = await this.prisma.genre.update({
      where: { id },
      data: GenreMapper.toPersistence(data)
    });
    return GenreMapper.toDomain(genre);
  }

  async delete(id: string): Promise<void> {
    const genre = await this.findById(id);
    if (!genre) {
      throw new Error('Genre not found');
    } else {
      await this.prisma.genre.delete({
        where: { id }
      });
    }
  }
}