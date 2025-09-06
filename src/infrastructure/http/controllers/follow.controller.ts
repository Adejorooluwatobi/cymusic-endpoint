import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FollowService } from '../../../domain/services/follow.service';

@ApiTags('Follow')
@Controller('follow')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Follow a user/artist' })
  async followUser(@Request() req, @Param('userId') userId: string) {
    const followerId = this.extractUserId(req.user).id;
    const follow = await this.followService.followUser(followerId, userId);
    return { succeeded: true, message: 'User followed successfully', resultData: follow };
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Unfollow a user/artist' })
  async unfollowUser(@Request() req, @Param('userId') userId: string) {
    const followerId = this.extractUserId(req.user).id;
    await this.followService.unfollowUser(followerId, userId);
    return { succeeded: true, message: 'User unfollowed successfully' };
  }

  @Get('followers/:userId')
  @ApiOperation({ summary: 'Get user followers' })
  async getFollowers(@Param('userId') userId: string) {
    const followers = await this.followService.getFollowers(userId);
    return { succeeded: true, message: 'Followers retrieved successfully', resultData: followers };
  }

  @Get('following/:userId')
  @ApiOperation({ summary: 'Get users being followed' })
  async getFollowing(@Param('userId') userId: string) {
    const following = await this.followService.getFollowing(userId);
    return { succeeded: true, message: 'Following retrieved successfully', resultData: following };
  }

  @Get('stats/:userId')
  @ApiOperation({ summary: 'Get follow statistics' })
  async getFollowStats(@Param('userId') userId: string) {
    const [followerCount, followingCount] = await Promise.all([
      this.followService.getFollowerCount(userId),
      this.followService.getFollowingCount(userId)
    ]);
    
    return {
      succeeded: true,
      message: 'Follow stats retrieved successfully',
      resultData: { followerCount, followingCount }
    };
  }

  private extractUserId(user: any): { id: string; type: string } {
    if (user.user?.id) return { id: user.user.id, type: 'user' };
    if (user.admin?.id) return { id: user.admin.id, type: 'admin' };
    if (user.superAdmin?.id) return { id: user.superAdmin.id, type: 'superAdmin' };
    if (user.artist?.id) return { id: user.artist.id, type: 'artist' };
    throw new Error('User ID not found in token');
  }
}