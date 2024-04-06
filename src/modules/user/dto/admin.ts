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
  accessToken: string;
  email: string;
  username: string;
}
