import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from '../../infrastructure/persistence/prisma/prisma-user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateArtistDto } from 'src/application/dto';

@Injectable()
export class ArtistService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async createArtist(createArtistDto: CreateArtistDto): Promise<UserEntity> {
    if (!createArtistDto.email || !createArtistDto.password) {
      throw new Error('Email and password are required');
    }
    const existingArtist = await this.userRepository.findByEmail(createArtistDto.email);
    if (existingArtist) {
      throw new ConflictException(`Artist with email ${createArtistDto.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(createArtistDto.password, 10);
    const newArtist = await this.userRepository.create({
      ...createArtistDto,
      password: hashedPassword,
      role: 'ARTIST',
      isVerified: false,
      isActive: true
    });
    console.log(`Artist created successfully: ${newArtist.email}`);
    return newArtist;
  }

  async findAllArtist(): Promise<UserEntity[]> {
    // TODO: Implement find all artists
    const artists = await this.userRepository.findAll();
    return artists.filter(artist => artist.role === 'ARTIST');
  }

  async findOneArtist(id: string): Promise<UserEntity | null> {
    const artist = await this.userRepository.findById(id);
    return artist;
  }

  async updateArtist(id: string, updateArtistDetails: Partial<UserEntity>): Promise<UserEntity> {
    if (updateArtistDetails.password) {
      updateArtistDetails.password = await bcrypt.hash(updateArtistDetails.password, 10);
    }
    const updatedArtist = await this.userRepository.update(id, { ...updateArtistDetails, role: 'ARTIST' });
    console.log(`Artist updated successfully: ${updatedArtist.email}`);
    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.userRepository.findById(id);
    if (!artist) {
      throw new Error(`Artist with id ${id} not found`);
    }
    await this.userRepository.delete(id);
    console.log(`Artist deleted successfully: ${artist.email}`);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const artist = await this.userRepository.findByEmail(email);
    return artist;
  }
}