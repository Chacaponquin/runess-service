import { Injectable } from "@nestjs/common";
import { CreateClientDTO } from "../dto/create";
import { Client } from "../domain";
import { ClientRepository } from "./client-repository";

@Injectable()
export class ClientServices {
  constructor(private readonly clientRepository: ClientRepository) {}

  createClient(dto: CreateClientDTO): Promise<Client> {
    return this.clientRepository.create(dto);
  }
}
