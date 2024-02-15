import { CreateUserDTO } from '../dto/create';
import { UserService } from '../services/user.service';

export class LoginUser {
  constructor(private readonly userServices: UserService) {}

  async execute(dto: CreateUserDTO) {
    const user = await this.userServices.createUser(dto);
  }
}
