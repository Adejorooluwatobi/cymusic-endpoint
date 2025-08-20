import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaArtistRepository } from '../../infrastructure/persistence/prisma/prisma-artist.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateArtistDto } from 'src/application/dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: PrismaArtistRepository) {}

  async createArtist(createArtistDto: CreateArtistDto): Promise<UserEntity> {
    if (!createArtistDto.email || !createArtistDto.password) {
      throw new Error('Email and password are required');
    }
    const existingArtist = await this.artistRepository.findByEmail(createArtistDto.email);
    if (existingArtist) {
      throw new ConflictException(`Artist with email ${createArtistDto.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(createArtistDto.password, 10);
    const newArtist = await this.artistRepository.create({
      ...createArtistDto,
      password: hashedPassword,
      isVerified: false,
      isActive: true
    });
    console.log(`Artist created successfully: ${newArtist.email}`);
    return newArtist;
  }

  async findAllArtist(): Promise<UserEntity[]> {
    return [];
  }

  async findOneArtist(id: string): Promise<UserEntity | null> {
    const artist = await this.artistRepository.findById(id);
    return artist;
  }

  async updateArtist(id: string, updateArtistDetails: Partial<UserEntity>): Promise<UserEntity> {
    if (updateArtistDetails.password) {
      updateArtistDetails.password = await bcrypt.hash(updateArtistDetails.password, 10);
    }
    const updatedArtist = await this.artistRepository.update(id, updateArtistDetails);
    console.log(`Artist updated successfully: ${updatedArtist.email}`);
    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      throw new Error(`Artist with id ${id} not found`);
    }
    await this.artistRepository.delete(id);
    console.log(`Artist deleted successfully: ${artist.email}`);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const artist = await this.artistRepository.findByEmail(email);
    return artist;
  }
}