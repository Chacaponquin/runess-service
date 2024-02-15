import { Injectable } from '@nestjs/common';
import { User } from '../domain';
import { CreateUserDTO } from '../dto/create';
import { UserRepository } from './user-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    await this.userRepository.create(dto);
  }
}
