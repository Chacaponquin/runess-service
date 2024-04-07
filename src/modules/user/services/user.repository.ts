import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dto/create";
import { User, UserPopulated, UserSimple } from "../domain";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IUser, IUserPopulated } from "../infrastructure/mongo/schema";
import {
  AddProductToFavoriteProps,
  DeleteProductFromFavoriteProps,
} from "../interfaces/user";
import { ProductRepository } from "@modules/product/services/product/product.repository";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(DB_MOELS.USERS) private readonly model: Model<IUser>,
    private readonly productRepository: ProductRepository,
  ) {}

  map(user: IUser): UserSimple {
    return new UserSimple({
      id: user.id,
      password: user.password,
      favorites: user.favorites.map((i) => i.toString()),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  mapPopulated(user: IUserPopulated): UserPopulated {
    return new UserPopulated({
      id: user.id,
      password: user.password,
      favorites: user.favorites.map((p) => this.productRepository.map(p)),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  async create(dto: CreateUserDTO): Promise<UserSimple> {
    const user = new this.model({
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: dto.password,
      image: null,
      phone: null,
      email: dto.email,
    });

    await user.save();

    return this.map(user);
  }

  async findByEmail(email: string): Promise<UserSimple | null> {
    const result = await this.model.findOne({ email: email });
    return result ? this.map(result) : null;
  }

  async findById(id: string): Promise<UserSimple | null> {
    const result = await this.model.findById(id);
    return result ? this.map(result) : null;
  }

  async addProductToFavorite(props: AddProductToFavoriteProps): Promise<void> {
    await this.model.findByIdAndUpdate(props.userId, {
      $push: {
        favorites: props.productId,
      },
    });
  }

  async deleteProductFromFavorite(
    props: DeleteProductFromFavoriteProps,
  ): Promise<void> {
    await this.model.findByIdAndUpdate(props.userId, {
      $pull: {
        favorites: props.productId,
      },
    });
  }

  async findByIdPopulated(id: string): Promise<UserPopulated | null> {
    const found = (await this.model
      .findById(id)
      .populate("favorites")) as IUserPopulated;

    if (found) {
      return this.mapPopulated(found);
    } else {
      return null;
    }
  }

  private async all(): Promise<User[]> {
    const data = await this.model.find();
    return data.map((u) => this.map(u));
  }
}
