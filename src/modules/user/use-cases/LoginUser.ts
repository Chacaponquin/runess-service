import { CryptServices } from '@shared/services/crypt.service';
import { LoginUserDTO } from '../dto/login';
import { UserService } from '../services/user.service';
import { LoginUserError } from '../exceptions';

export class LoginUser {
  constructor(
    private readonly userServices: UserService,
    private readonly cryptServices: CryptServices
  ) {}

  async execute(dto: LoginUserDTO): Promise<string> {
    const found = await this.userServices.findUserByEmail(dto.email);

    if (found) {
      const equal = await this.cryptServices.compare(
        found.password,
        dto.password
      );

      if (equal) {
        const token = this.userServices.generateAccessToken(found.id);
        return token;
      } else {
        throw new LoginUserError();
      }
    } else {
      throw new LoginUserError();
    }
  }
}
