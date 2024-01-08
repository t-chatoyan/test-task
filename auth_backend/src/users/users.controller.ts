import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegister } from "./dto/user-register.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() userRegisterInput: UserRegister) {
    return this.usersService.register(userRegisterInput);
  }
}
