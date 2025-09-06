import { Controller, Get, Post, Body, Param, ValidationPipe, Put, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { CreateSuperAdminDto } from '../../../application/dto/super-admin/create-super-admin.dto';
import { SuperAdminService } from 'src/domain/services/super-admin.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('super-admins')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new super admin' })
  async create(@Body(new ValidationPipe) createSuperAdminDto: CreateSuperAdminDto) {
    const superAdmin = await this.superAdminService.createSuperAdmin(createSuperAdminDto);
    if (!superAdmin) {
      throw new Error('Super Admin creation failed');
    }
    return {
      succeeded: true,
      message: 'Super Admin created successfully',
      resultData: superAdmin
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all super admins' })
  async findAll() {
    const superAdmins = await this.superAdminService.findAllSuperAdmin();
    return {
      succeeded: true,
      message: 'Super Admins retrieved successfully',
      resultData: superAdmins
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a super admin by ID' })
  async findOne(@Param('id') id: string) {
    const superAdmin = await this.superAdminService.findOneSuperAdmin(id);
    if (!superAdmin) {
      throw new NotFoundException(`Super Admin with id ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'Super Admin retrieved successfully',
      resultData: superAdmin
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a super admin by ID' })
  async update(@Param('id') id: string, @Body() updateSuperAdminDto: Partial<CreateSuperAdminDto>) {
    const superAdmin = await this.superAdminService.updateSuperAdmin(id, updateSuperAdminDto);
    if (!superAdmin) {
      throw new NotFoundException(`Super Admin with id ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'Super Admin updated successfully',
      resultData: superAdmin
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a super admin by ID' })
  async delete(@Param('id') id: string) {
    await this.superAdminService.deleteSuperAdmin(id);
    return {
      succeeded: true,
      message: 'Super Admin deleted successfully'
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current super admin info with profile' })
  async getMe(@Request() req: any) {
    if (!req.user.superAdmin?.id) {
      throw new NotFoundException('Super Admin not found in token');
    }
    const superAdmin = await this.superAdminService.findOneSuperAdmin(req.user.superAdmin.id);
    if (!superAdmin) {
      throw new NotFoundException('Super Admin not found');
    }
    return {
      succeeded: true,
      message: 'Super Admin info retrieved successfully',
      resultData: superAdmin
    };
  }
}