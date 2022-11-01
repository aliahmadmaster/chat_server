import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
