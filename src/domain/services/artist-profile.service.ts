import { Injectable, Inject } from '@nestjs/common';
import { ArtistProfile } from '../entities/artist-profile.entity';
import type { IArtistProfileRepository } from '../repositories/artist-profile.repository.interface';
import { CreateArtistProfileParams, UpdateArtistProfileParams } from 'src/utils/types';

@Injectable()
export class ArtistProfileService {
  constructor(@Inject('IArtistProfileRepository') private readonly artistProfileRepository: IArtistProfileRepository) {}

async createArtistProfile(ArtistProfileDetails: CreateArtistProfileParams): Promise<ArtistProfile> {
    const ROYALTY_RATE_MULTIPLIER = 0.01; // 1% royalty rate
    const royaltyRate = ArtistProfileDetails.activeFollowers * ROYALTY_RATE_MULTIPLIER;
    return this.artistProfileRepository.create({
      ...ArtistProfileDetails,
      royaltyRate,
    });
  }

  async getArtistProfileById(id: string): Promise<ArtistProfile | null> {
    return this.artistProfileRepository.findById(id);
  }

  async getArtistProfileByArtistId(artistId: string): Promise<ArtistProfile | null> {
    return this.artistProfileRepository.findByArtistId(artistId);
  }

  async updateArtistProfile(id: string, ArtistProfileDetails: UpdateArtistProfileParams): Promise<ArtistProfile> {
    return this.artistProfileRepository.update(id, {
      ...ArtistProfileDetails,
    });
  }

  async deleteArtistProfile(id: string): Promise<void> {
    return this.artistProfileRepository.delete(id);
  }

  async getAllArtistProfiles(): Promise<ArtistProfile[]> {
    return this.artistProfileRepository.findAll();
  }
}
