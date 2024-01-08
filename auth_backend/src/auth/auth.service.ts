import { BadRequestException , HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuth } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async generateToken(user){
    return await this.jwtService.signAsync(user);
  }

 async login(userLoginData: LoginAuth) {
    const user = await this.usersService.findOne(userLoginData);

   if (user) {
     const { password, ...payload } = user;
     const token = await this.generateToken(payload);
      return new HttpException({
        data: {
          accessToken: token,
        },
      }, HttpStatus.ACCEPTED)
    }

   throw new BadRequestException('username or password is not correct!');
  }

  async getAuthUser (authToken) {
    const authUser = await this.jwtService.decode(authToken);
    const { password, ...userProfile} =  await this.usersService.getUser(authUser.id);
    return new HttpException({ data: userProfile }, HttpStatus.OK);
  }
}
