import { Injectable } from '@nestjs/common';
import { UserMongoRepository } from '../infrastructure/mongo';
import { CreateUserDTO } from '../dto/create';
import { User } from '../domain';

@Injectable()
export class UserRepository {
  constructor(private readonly mongoRepository: UserMongoRepository) {}

  async create(dto: CreateUserDTO): Promise<User> {
    const user = await this.mongoRepository.create(dto);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {}
}
