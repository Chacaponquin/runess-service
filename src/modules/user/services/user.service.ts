import { Injectable } from "@nestjs/common";
import { User } from "../domain";
import { CreateUserDTO } from "../dto/create";
import { UserRepository } from "./user.repository";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/jwt";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  createUser(dto: CreateUserDTO): Promise<User> {
    return this.userRepository.create(dto);
  }

  generateAccessToken(userId: string): string {
    const payload: JwtPayload = { userId: userId };
    return this.jwtService.sign(payload);
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
