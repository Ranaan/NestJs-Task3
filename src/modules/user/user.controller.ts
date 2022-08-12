import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async addUser(@Body() user: { username: string; password: string }) {
    return await this.userService.addUser(user.username, user.password);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: { username: string; password: string },
  ) {
    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Post()
  async signUp(@Body() user: { username: string; password: string }) {
    return await this.userService.signUp(user);
  }

  @Post()
  async login(@Body() user: { username: string; password: string }) {
    return await this.userService.login(user);
  }
}
