import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtService} from "@nestjs/jwt";
import {Request} from 'express';
import {UsersService} from "../users/users.service";

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService:  UsersService,
    private jwtService: JwtService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    return this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      )
      .then(async (payload) => {
        const user = await this.usersService.getUser(payload.id);
        if (user) {
          return true;
        }
        throw new BadRequestException('User not found');
      })
      .catch(() => {
        throw new BadRequestException('User not authorized');
      })
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined
  }
}
