import { Injectable } from "@nestjs/common";
import { CreateClientDTO } from "../dto/create";
import { Client } from "../domain";
import { ClientRepository } from "./client-repository";

@Injectable()
export class ClientServices {
  constructor(private readonly repository: ClientRepository) {}

  createClient(dto: CreateClientDTO): Promise<Client> {
    return this.repository.create(dto);
  }
}
