import { Body, Controller, Get, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(
    @Query('page', ParseIntPipe ) page: number = 1, 
    @Query('count', ParseIntPipe ) count =1
  ) {
    return this.userService.getUsers(page, count);
  }
  
  @Post()
  async createUser(@Body() createUserData: CreateUserDTO) {
    return this.userService.createUser(createUserData);
  }

  
}
