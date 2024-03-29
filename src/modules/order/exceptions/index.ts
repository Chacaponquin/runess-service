import { HttpException, HttpStatus } from "@nestjs/common";

export class OrderMissingProductException extends HttpException {
  constructor() {
    super("", HttpStatus.NOT_FOUND);
  }
}
