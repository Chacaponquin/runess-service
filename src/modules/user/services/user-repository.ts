import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dto/create";
import { User } from "../domain";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IUser } from "../infrastructure/mongo/schema";

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

    return this._map(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.model.findOne({ email: email });
    return result ? this._map(result) : null;
  }

  private _map(user: IUser): User {
    return new User({ id: user.id, password: user.password });
  }
}
