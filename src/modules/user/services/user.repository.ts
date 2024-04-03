import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dto/create";
import { User } from "../domain";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IUser } from "../infrastructure/mongo/schema";
import {
  AddProductToFavoriteProps,
  DeleteProductFromFavoriteProps,
} from "../interfaces/user";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(DB_MOELS.USERS) private readonly model: Model<IUser>,
  ) {}

  async create(dto: CreateUserDTO): Promise<User> {
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

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.model.findOne({ email: email });
    return result ? this.map(result) : null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.model.findById(id);
    return result ? this.map(result) : null;
  }

  private map(user: IUser): User {
    return new User({
      id: user.id,
      password: user.password,
      favorites: user.favorites.map((i) => i.toString()),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  async countProductFavorites(id: string): Promise<number> {
    let sum = 0;

    const all = await this.all();

    all.forEach((u) => {
      if (u.favorites.includes(id)) {
        sum++;
      }
    });

    return sum;
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

  private async all(): Promise<User[]> {
    const data = await this.model.find();
    return data.map((u) => this.map(u));
  }
}
