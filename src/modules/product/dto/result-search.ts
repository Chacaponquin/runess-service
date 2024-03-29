import { SendProductDTO } from "./send";

export interface ResultSearchDTO {
  product: Array<SendProductDTO>;
  page: number;
}
