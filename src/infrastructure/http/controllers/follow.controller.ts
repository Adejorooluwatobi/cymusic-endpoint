import { Controller, Post, Delete, Get, Param, UseGuards, Request, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FollowService } from '../../../domain/services/follow.service';
import { FollowArtistDto } from '../dto/follow.dto';

@ApiTags('Follow')
@Controller('follow')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post()
  @ApiOperation({ summary: 'Follow an artist' })
  async followArtist(@Request() req, @Body() followArtistDto: FollowArtistDto) {
    const followerId = this.extractUserId(req.user);
    const follow = await this.followService.followUser(followerId, followArtistDto.artistId);
    return { succeeded: true, message: 'Artist followed successfully', resultData: follow };
  }

  @Delete()
  @ApiOperation({ summary: 'Unfollow an artist' })
  async unfollowArtist(@Request() req, @Body() followArtistDto: FollowArtistDto) {
    const followerId = this.extractUserId(req.user);
    await this.followService.unfollowUser(followerId, followArtistDto.artistId);
    return { succeeded: true, message: 'Artist unfollowed successfully' };
  }

  @Get('followers')
  @ApiOperation({ summary: 'Get my followers (for artists)' })
  async getMyFollowers(@Request() req) {
    const artistId = this.extractUserId(req.user);
    const followers = await this.followService.getFollowers(artistId);
    return { succeeded: true, message: 'Followers retrieved successfully', resultData: followers };
  }

  @Get('followers/:followerId')
  @ApiOperation({ summary: 'Get follower by ID (for artists)' })
  async getFollowerById(@Request() req, @Param('followerId') followerId: string) {
    const artistId = this.extractUserId(req.user);
    const follower = await this.followService.getFollowerById(artistId, followerId);
    return { succeeded: true, message: 'Follower retrieved successfully', resultData: follower };
  }

  private extractUserId(user: any): string {
    return user.user?.id || user.artist?.id || user.admin?.id || user.superAdmin?.id;
  }
}