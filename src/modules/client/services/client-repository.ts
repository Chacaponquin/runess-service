import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { IClient } from "../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { Client } from "../domain";
import { CreateClientDTO } from "../dto/create";

@Injectable()
export class ClientRepository {
  constructor(
    @InjectModel(DB_MOELS.CLIENT)
    private readonly model: Model<IClient>,
  ) {}

  async create(dto: CreateClientDTO): Promise<Client> {
    const client = new this.model({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      user: dto.userId,
    });

    await client.save();

    return this._map(client);
  }

  private _map(client: IClient): Client {
    return new Client({ ...client, id: client.id });
  }
}
