import { Injectable } from '@nestjs/common';
import { User } from '../domain';
import { CreateUserDTO } from '../dto/create';
import { UserRepository } from './user-repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    return await this.userRepository.create(dto);
  }

  generateAccessToken(userID: string): string {
    const payload: JwtPayload = { userID };
    return this.jwtService.sign(payload);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
