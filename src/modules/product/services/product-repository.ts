import { Injectable } from "@nestjs/common";
import { ProductMongoRepository } from "../infrastructure/mongo/core/product-mongo-repository";

@Injectable()
export class ProductRepository {
  constructor(private readonly mongoRepository: ProductMongoRepository) {}
}
