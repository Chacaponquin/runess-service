import { Injectable } from "@nestjs/common";
import { ClotheRepository } from "./clothe-repository";

@Injectable()
export class ClotheServices {
  constructor(private readonly clotheRepository: ClotheRepository) {}
}
