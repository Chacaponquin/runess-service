import { Injectable } from "@nestjs/common";
import { CurrentUser, User, UserMessage } from "../domain";
import { CreateUserDTO } from "../dto/create";
import { UserRepository } from "./user.repository";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/jwt";
import { UserMessageRepository } from "./message.repository";
import { CreateContactMessageDTO } from "../dto/message";
import {
  AddProductToFavoriteProps,
  DeleteProductFromFavoriteProps,
} from "../interfaces/user";
import { EnvService } from "@modules/app/modules/env/services/env.service";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly messageRepository: UserMessageRepository,
    private readonly envServices: EnvService,
  ) {}

  createUser(dto: CreateUserDTO): Promise<User> {
    return this.userRepository.create(dto);
  }

  generateAccessToken(userId: string): string {
    const payload: JwtPayload = { userId: userId };
    return this.jwtService.sign(payload, {
      expiresIn: this.envServices.ACCESS_TOKEN_EXPIRES_TIME,
    });
  }

  genearteRefreshToken(userId: string): string {
    const payload: JwtPayload = { userId: userId };
    return this.jwtService.sign(payload, {
      expiresIn: this.envServices.REFRESH_TOKEN_EXPIRES_TIME,
    });
  }

  async verifyToken(token: string): Promise<CurrentUser | null> {
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      const user = await this.findById(payload.userId);

      if (user) {
        return { id: user.id };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  createMessage(props: CreateContactMessageDTO): Promise<UserMessage> {
    return this.messageRepository.create(props);
  }

  countProductFavorites(id: string): Promise<number> {
    return this.userRepository.countProductFavorites(id);
  }

  async addProductToFavorite(props: AddProductToFavoriteProps): Promise<void> {
    await this.userRepository.addProductToFavorite(props);
  }

  async deleteProductFromFavorite(
    props: DeleteProductFromFavoriteProps,
  ): Promise<void> {
    await this.userRepository.deleteProductFromFavorite(props);
  }
}
