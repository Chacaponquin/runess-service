import { Injectable } from "@nestjs/common";
import { ClotheMongoRepository } from "../infrastructure/mongo/core/clothe-mongo-repository";
import { Clothe } from "../domain";

@Injectable()
export class ClotheRepository {
  constructor(private readonly mongoRepository: ClotheMongoRepository) {}

  async all(): Promise<Array<Clothe>> {
    return this.mongoRepository.all();
  }
}
