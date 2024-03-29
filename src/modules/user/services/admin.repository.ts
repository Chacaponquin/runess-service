import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { IAdmin } from "../infrastructure/mongo/schema";
import { AdminUser } from "../domain";
import { Model } from "mongoose";
import { CreateAdminUserProps } from "../interfaces/admin";

@Injectable()
export class AdminUserRepository {
  constructor(
    @InjectModel(DB_MOELS.ADMIN_USERS) private readonly model: Model<IAdmin>,
  ) {}

  async findByEmail(email: string): Promise<AdminUser | null> {
    const found = await this.model.findOne({ email: email });
    return found ? this.map(found) : null;
  }

  async findByUsername(username: string): Promise<AdminUser | null> {
    const found = await this.model.findOne({ username: username });
    return found ? this.map(found) : null;
  }

  async create({
    email,
    password,
    username,
  }: CreateAdminUserProps): Promise<AdminUser | null> {
    const newUser = new this.model({
      username: username,
      password: password,
      email: email,
    });

    await newUser.save();

    return this.map(newUser);
  }

  private map(user: IAdmin): AdminUser {
    return new AdminUser({
      email: user.email,
      id: user.id,
      password: user.password,
      username: user.username,
    });
  }
}
