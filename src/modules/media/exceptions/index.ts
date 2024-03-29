import { HttpException, HttpStatus } from "@nestjs/common";

export class UploadImageException extends HttpException {
  constructor() {
    super("", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class DeleteImageException extends HttpException {
  constructor() {
    super("", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
