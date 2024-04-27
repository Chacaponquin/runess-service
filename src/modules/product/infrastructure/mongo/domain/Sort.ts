import { FILTER_ORDER } from "@modules/product/constants";

export class ProductSort {
  protected _value: Record<string, 1 | -1>;

  constructor(sort?: FILTER_ORDER) {
    const obj = {};

    if (sort === FILTER_ORDER.MAX_PRICE) {
      obj["product.price"] = -1;
    } else if (sort === FILTER_ORDER.MIN_PRICE) {
      obj["product.price"] = 1;
    } else if (sort === FILTER_ORDER.POPULAR) {
      obj["product.favoritesCount"] = -1;
    } else {
      obj["createdAt"] = -1;
    }

    this._value = obj;
  }

  get value() {
    return this._value;
  }
}

export class ClotheSort extends ProductSort {}

export class MedicineSort extends ProductSort {}
