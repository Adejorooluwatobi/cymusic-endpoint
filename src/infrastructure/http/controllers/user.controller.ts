import { Controller, Get, Post, Put, Body, Param, ValidationPipe, ParseUUIDPipe, Delete } from '@nestjs/common';
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/application/dto/user/update-user.dto';
import { UserService } from 'src/domain/services/user.service';

@ApiExtraModels(CreateUserDto)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    if(!user) {
      throw new Error('User creation failed');
    }
    return {
      succeeded: true,
      message: 'User created successfully',
      resultData: user
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  async findAll() {
    const users = await this.userService.findAllUser();
    return {
      succeeded: true,
      message: 'Users retrieved successfully',
      resultData: users
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOneUser(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'User retrieved successfully',
      resultData: user
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, updateUserDto);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'User updated successfully',
      resultData: user
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.deleteUser(id);
    return {
      succeeded: true,
      message: 'User deleted successfully'
    };
  }
}