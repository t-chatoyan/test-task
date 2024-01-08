import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserRegister {
  @IsNotEmpty({ message: 'name can not be empty' })
  @IsString({ message: 'not valid type for name' })
  @MinLength(3, { message: 'Minimum name length is 3 characters' })
  name: string;

  @IsNotEmpty({ message: 'username can not be empty' })
  @IsString({ message: 'not valid type for username' })
  @MinLength(6, { message: 'Minimum username length is 6 characters' })
  username: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString({ message: 'not valid type for password' })
  @MinLength(6, { message: 'Minimum password length is 6 characters' })
  password: string;
}
