import { IsNotEmpty, IsString } from "class-validator";

export class SignInAdminDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export interface ResponseSignInAdminDTO {
  id: string;
  token: string;
  email: string;
  username: string;
}
