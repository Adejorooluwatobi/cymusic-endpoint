import { Injectable, Inject } from '@nestjs/common';
import type { IMusicRepository } from '../repositories/music.repository.interface';
import { MusicEntity } from '../entities/music.entity';

@Injectable()
export class SearchService {
  constructor(@Inject('IMusicRepository') private readonly musicRepository: IMusicRepository) {}

  async searchMusic(query: string): Promise<MusicEntity[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    const sanitizedQuery = query.trim().toLowerCase();
    return this.musicRepository.search(sanitizedQuery);
  }

  async getPopularMusic(limit: number = 20): Promise<MusicEntity[]> {
    return this.musicRepository.findPopular(limit);
  }

  async getRecommendations(userId: string, limit: number = 10): Promise<MusicEntity[]> {
    return this.musicRepository.findRecommended(userId, limit);
  }

  async getMusicByGenre(genreId: string): Promise<MusicEntity[]> {
    return this.musicRepository.findByGenre(genreId);
  }
}