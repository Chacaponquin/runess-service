import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from "class-validator";

export class CreateUserDTO {
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @MinLength(5)
  @IsString()
  lastName: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
