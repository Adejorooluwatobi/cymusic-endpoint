import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from 'src/domain/services/profile.service';
import { CreateProfileDto } from 'src/application/dto/profile/create-profile.dto';
import { UpdateProfileDto } from 'src/application/dto/profile/update-profile.dto';

@ApiTags('Profile')
@Controller('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new profile' })
    async createProfile(@Body() createProfileDto: CreateProfileDto, @Request() req: any) {
        const userInfo = this.extractUserId(req.user);
        const profile = await this.profileService.createProfile(createProfileDto, userInfo.id, userInfo.type);
        return profile;
    }

    @Get()
    @ApiOperation({ summary: 'Get my profile' })
    async getMyProfile(@Request() req: any) {
        const userInfo = this.extractUserId(req.user);
        return this.profileService.getProfileByUserId(userInfo.id, userInfo.type);
    }

    @Get('all')
    @ApiOperation({ summary: 'Get all profiles' })
    async getAllProfiles() {
        return this.profileService.getAllProfiles();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get profile by ID' })
    async getProfile(@Param('id') id: string) {
        return this.profileService.getProfileById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update profile by ID' })
    async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.updateProfile(id, updateProfileDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete profile by ID' })
    async deleteProfile(@Param('id') id: string) {
        return this.profileService.deleteProfile(id);
    }

    private extractUserId(user: any): { id: string; type: string } {
        if (user.user?.id) return { id: user.user.id, type: 'user' };
        if (user.admin?.id) return { id: user.admin.id, type: 'admin' };
        if (user.superAdmin?.id) return { id: user.superAdmin.id, type: 'superAdmin' };
        if (user.artist?.id) return { id: user.artist.id, type: 'artist' };
        throw new Error('User ID not found in token');
    }
}