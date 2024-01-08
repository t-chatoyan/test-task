import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuth } from './dto/login-auth.dto';
import { UserAuthGuard } from '../core/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('/login')
  login(@Body() loginAuthDto: LoginAuth) {
    return this.authService.login(loginAuthDto);
  }

  @Get('/profile')
  @UseGuards(UserAuthGuard)
  async getUser(@Req() request: Request) {
    const authorizationHeader = request.headers['authorization'] as string;
    const authToken = authorizationHeader.split(" ")[1] || '';
    return await this.authService.getAuthUser(authToken);
  }
}
