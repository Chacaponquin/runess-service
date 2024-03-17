import { HttpException, HttpStatus } from "@nestjs/common";

export class UploadProductImageException extends HttpException {
  constructor() {
    super("", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
