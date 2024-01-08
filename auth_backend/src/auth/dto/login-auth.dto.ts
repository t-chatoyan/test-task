import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAuth {
  @IsNotEmpty({ message: 'username can not be empty' })
  @IsString({ message: 'not valid type for username' })
  @MinLength(3, { message: 'Minimum password length is 6 characters' })
  username: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString({ message: 'not valid type for password' })
  @MinLength(6, { message: 'Minimum password length is 6 characters' })
  password: string;
}
