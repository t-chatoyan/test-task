import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as crypto from 'crypto';
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import {UserRegister} from "./dto/user-register.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(userLoginData: any): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: userLoginData.username,
        password: crypto
          .createHash('md5')
          .update(userLoginData.password)
          .digest('hex'),
      }
    });
  }

  async getUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async register(userData: UserRegister) {
    const userExist = await this.userNameExist(userData.username);
    if (userExist) {
      throw new BadRequestException('username already exist');
    }
    const user = await this.userRepository.create({
      name: userData.name,
      username: userData.username,
      password: crypto
        .createHash('md5')
        .update(userData.password)
        .digest('hex'),
    });
    await this.userRepository.save(user);
    return new HttpException('Success', HttpStatus.OK);
  }

  async userNameExist(username: string) {
    return !!(await this.userRepository.findOne({ where: { username }}));
  }
}
