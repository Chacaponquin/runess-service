import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IClothe } from "../schema";
import { Clothe } from "@modules/product/domain";

@Injectable()
export class ClotheMongoRepository {
  constructor(
    @InjectModel(DB_MOELS.CLOTHE)
    private readonly model: Model<IClothe>,
  ) {}

  async all(): Promise<Array<Clothe>> {
    return [];
  }
}
