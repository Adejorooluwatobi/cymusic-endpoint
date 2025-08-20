import { Controller, Get, Post, Body, Param, ValidationPipe, Put, Delete } from '@nestjs/common';
import { CreateAdminDto } from '../../../application/dto/admin/create-admin.dto';
import { AdminService } from 'src/domain/services/admin.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  async create(@Body(new ValidationPipe()) createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.createAdmin(createAdminDto);
    if (!admin) {
      throw new Error('Admin creation failed');
    }
    return {
      succeeded: true,
      message: 'Admin created successfully',
      resultData: admin
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all admins' })
  async findAll() {
    const admins = await this.adminService.findAllAdmin();
    return {
      succeeded: true,
      message: 'Admins retrieved successfully',
      resultData: admins
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an admin by ID' })
  async findOne(@Param('id') id: string) {
    const admin = await this.adminService.findOneAdmin(id);
    if (!admin) {
      throw new Error(`Admin with id ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'Admin retrieved successfully',
      resultData: admin
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an admin by ID' })
  async update(@Param('id') id: string, @Body() updateAdminDto: Partial<CreateAdminDto>) {
    const admin = await this.adminService.updateAdmin(id, updateAdminDto);
    if (!admin) {
      throw new Error(`Admin with id ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'Admin updated successfully',
      resultData: admin
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an admin by ID' })
  async delete(@Param('id') id: string) {
    await this.adminService.deleteAdmin(id);
    return {
      succeeded: true,
      message: 'Admin deleted successfully'
    };
  }
}