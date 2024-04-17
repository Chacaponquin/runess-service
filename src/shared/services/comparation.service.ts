import { Injectable } from "@nestjs/common";
import str from "string-comparison";

@Injectable()
export class ComparationService {
  compare(str1: string, str2: string): number {
    return str.cosine.similarity(str1, str2);
  }
}
