import { Injectable } from "@nestjs/common";
import { Clothe } from "../domain";
import { ClotheRepository } from "./clothe-repository";

@Injectable()
export class ClotheServices {
  constructor(private readonly clotheRepository: ClotheRepository) {}

  async getAll(): Promise<Clothe> {
    return this.clotheRepository.all();
  }
}
