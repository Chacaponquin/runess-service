import { RespProductDTO } from "./product";

export interface ResultSearchDTO {
  product: Array<RespProductDTO>;
  page: number;
}
