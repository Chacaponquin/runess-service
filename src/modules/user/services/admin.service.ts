import { Injectable, OnModuleInit } from "@nestjs/common";
import { AdminUserRepository } from "./admin.repository";
import { AdminUser } from "../domain";
import { CreateAdminUserProps } from "../interfaces/admin";
import { CryptServices } from "@shared/services/crypt.service";

@Injectable()
export class AdminUserServices implements OnModuleInit {
  constructor(
    private readonly repository: AdminUserRepository,
    private readonly cryptServies: CryptServices,
  ) {}

  async onModuleInit() {
    const found = await this.repository.findByUsername("TestAdmin");

    if (!found) {
      await this.createAdminUser({
        password: "12345678",
        email: "admin@gmail.com",
        username: "TestAdmin",
      });
    }
  }

  findByEmail(email: string): Promise<AdminUser | null> {
    return this.repository.findByEmail(email);
  }

  findByUsername(username: string): Promise<AdminUser | null> {
    return this.repository.findByUsername(username);
  }

  async createAdminUser(
    props: CreateAdminUserProps,
  ): Promise<AdminUser | null> {
    const hash = await this.cryptServies.hash(props.password);

    return this.repository.create({
      ...props,
      password: hash,
    });
  }
}
