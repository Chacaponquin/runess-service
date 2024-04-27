type Props = Partial<{
  maxPrice: number;
  minPrice: number;
  providers: string[];
}>;

type ClotheProps = Props &
  Partial<{
    colors: string[];
    sizes: string[];
  }>;

export class ProductMatch {
  protected _value: Record<string, unknown>;

  constructor({ providers, maxPrice, minPrice }: Props) {
    const match = {};

    if (providers && providers.length > 0) {
      match["product.provider"] = { $in: providers };
    }

    if (minPrice || maxPrice) {
      const price = {};

      if (maxPrice !== undefined) {
        price["$lte"] = maxPrice;
      }

      if (minPrice !== undefined) {
        price["$gte"] = minPrice;
      }

      match["product.price"] = price;
    }

    this._value = match;
  }

  get value() {
    return this._value;
  }
}

export class MedicineMatch extends ProductMatch {}

export class ClotheMatch extends ProductMatch {
  constructor({ colors, maxPrice, minPrice, providers, sizes }: ClotheProps) {
    super({ maxPrice, minPrice, providers });

    if (colors && colors.length > 0) {
      this._value["colors"] = { $in: colors };
    }

    if (sizes && sizes.length > 0) {
      this._value["sizes"] = { $in: sizes };
    }
  }
}
