import { Injectable, OnModuleInit } from "@nestjs/common";
import { CurrentUser, UserMessage, UserSimple } from "../domain";
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
import { CryptServices } from "@shared/services/crypt.service";
import { RepeatUserError } from "../exceptions";
import { Product } from "@modules/product/domain";

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly messageRepository: UserMessageRepository,
    private readonly envServices: EnvService,
    private readonly cryptServices: CryptServices,
  ) {}

  async onModuleInit() {
    const email = "hectorangel2001@gmail.com";
    const found = await this.findUserByEmail(email);

    if (!found) {
      await this.createUser({
        email: email,
        firstName: "Hector",
        lastName: "Gomez Robaina",
        password: "12345678",
      });
    }
  }

  async createUser(dto: CreateUserDTO): Promise<UserSimple> {
    const found = await this.findUserByEmail(dto.email);

    if (!found) {
      const newPassword = await this.cryptServices.hash(dto.password);
      return this.userRepository.create({ ...dto, password: newPassword });
    } else {
      throw new RepeatUserError();
    }
  }

  generateAccessToken(userId: string): string {
    const payload: JwtPayload = { userId: userId };
    return this.jwtService.sign(payload, {
      expiresIn: this.envServices.ACCESS_TOKEN_EXPIRES_TIME,
      secret: this.envServices.ACCESS_SECRET_WORD,
    });
  }

  genearteRefreshToken(userId: string): string {
    const payload: JwtPayload = { userId: userId };
    return this.jwtService.sign(payload, {
      expiresIn: this.envServices.REFRESH_TOKEN_EXPIRES_TIME,
      secret: this.envServices.REFRESH_SECRET_WORD,
    });
  }

  async verifyToken(
    token: string,
    type: "refresh" | "access",
  ): Promise<CurrentUser | null> {
    try {
      const payload: JwtPayload = this.jwtService.verify(token, {
        secret:
          type === "access"
            ? this.envServices.ACCESS_SECRET_WORD
            : this.envServices.REFRESH_SECRET_WORD,
      });

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

  findById(id: string): Promise<UserSimple | null> {
    return this.userRepository.findById(id);
  }

  findUserByEmail(email: string): Promise<UserSimple | null> {
    return this.userRepository.findByEmail(email);
  }

  createMessage(props: CreateContactMessageDTO): Promise<UserMessage> {
    return this.messageRepository.create(props);
  }

  addProductToFavorite(props: AddProductToFavoriteProps): Promise<void> {
    return this.userRepository.addProductToFavorite(props);
  }

  deleteProductFromFavorite(
    props: DeleteProductFromFavoriteProps,
  ): Promise<void> {
    return this.userRepository.deleteProductFromFavorite(props);
  }

  async getFavoriteProducts(id: string): Promise<Product[]> {
    const populated = await this.userRepository.findByIdPopulated(id);

    if (populated) {
      return populated.favorites;
    } else {
      return [];
    }
  }
}
