import { Controller, Post, Get, Put, Delete, Body, Param, Request, UseGuards, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ArtistProfileService } from '../../../domain/services/artist-profile.service';
import { CreateArtistProfileDto } from '../../../application/dto/artist-profile/create-artist-profile.dto';
import { UpdateArtistProfileDto } from '../../../application/dto/artist-profile/update-artist-profile.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@ApiTags('ArtistProfile')
@Controller('artist-profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ArtistProfileController {
  constructor(private readonly artistProfileService: ArtistProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create artist profile' })
  async create(@Body() artistProDetails: CreateArtistProfileDto, @Request() req: any) {
    const userInfo = this.extractUserId(req.user);
    const profileData = {
      ...artistProDetails,
      artistId: userInfo.id,
      activeFollowers: 0,
      isVerified: false
    };
    return await this.artistProfileService.createArtistProfile(profileData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist profile by ID' })
  async getById(@Param('id') id: string) {
    return await this.artistProfileService.getArtistProfileById(id);
  }

  @Get('artist/:artistId')
  @ApiOperation({ summary: 'Get artist profile by artist ID' })
  async getByArtistId(@Param('artistId') artistId: string) {
    return await this.artistProfileService.getArtistProfileByArtistId(artistId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist profile' })
  async update(@Param('id') id: string, @Body() artistProDetails: UpdateArtistProfileDto, @Request() req: any) {
    const userInfo = this.extractUserId(req.user);
    const profile = await this.artistProfileService.getArtistProfileById(id);
    if (!profile) {
      throw new NotFoundException('Artist profile not found');
    }
    if (profile.artistId !== userInfo.id) {
      throw new UnauthorizedException('Can only update your own profile');
    }
    return await this.artistProfileService.updateArtistProfile(id, artistProDetails);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist profile' })
  async delete(@Param('id') id: string, @Request() req: any) {
    const userInfo = this.extractUserId(req.user);
    const profile = await this.artistProfileService.getArtistProfileById(id);
    if (!profile) {
      throw new NotFoundException('Artist profile not found');
    }
    if (profile.artistId !== userInfo.id) {
      throw new UnauthorizedException('Can only delete your own profile');
    }
    await this.artistProfileService.deleteArtistProfile(id);
    return { succeeded: true, message: 'Artist profile deleted successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all artist profiles' })
  async getAll() {
    return await this.artistProfileService.getAllArtistProfiles();
  }

  private extractUserId(user: any): { id: string; type: string } {
    if (user.user?.id) return { id: user.user.id, type: 'user' };
    if (user.admin?.id) return { id: user.admin.id, type: 'admin' };
    if (user.superAdmin?.id) return { id: user.superAdmin.id, type: 'superAdmin' };
    if (user.artist?.id) return { id: user.artist.id, type: 'artist' };
    throw new Error('User ID not found in token');
  }
}
