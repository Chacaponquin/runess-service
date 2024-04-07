import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

interface CompareProps {
  value: string;
  hashed: string;
}

@Injectable()
export class CryptServices {
  async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async compare({ hashed, value }: CompareProps): Promise<boolean> {
    return await bcrypt.compare(value, hashed);
  }
}
