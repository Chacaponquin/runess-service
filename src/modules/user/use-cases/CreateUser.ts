import { CryptServices } from '@shared/services/crypt.service';
import { CreateUserDTO } from '../dto/create';
import { UserService } from '../services/user.service';

export class CreateUser {
  constructor(
    private readonly userServices: UserService,
    private readonly cryptServices: CryptServices
  ) {}

  async execute(dto: CreateUserDTO): Promise<string> {
    const newPassword = await this.cryptServices.hash(dto.password);
    const user = await this.userServices.createUser({
      ...dto,
      password: newPassword
    });

    return this.userServices.generateAccessToken(user.id);
  }
}
