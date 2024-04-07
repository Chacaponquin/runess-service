import { FilterClotheProps } from "@modules/product/interfaces/clothe";
import { FilterMedicineProps } from "@modules/product/interfaces/medicine";
import { FilterProductProps } from "@modules/product/interfaces/product";

abstract class ProductMatch {
  match: Record<string, unknown>;

  constructor(dto: FilterProductProps) {
    let final: Record<string, unknown> = {
      "product.price": { $gte: dto.minPrice, $lte: dto.maxPrice },
    };

    if (dto.provider !== "") {
      final = { ...final, provider: dto.provider };
    }

    this.match = final;
  }
}

export class ClotheMatch extends ProductMatch {
  constructor(dto: FilterClotheProps) {
    super(dto);

    if (dto.colors.length !== 0) {
      this.match = { ...this.match, colors: { $in: dto.colors } };
    }

    if (dto.sizes.length !== 0) {
      this.match = { ...this.match, sizes: dto.sizes };
    }
  }
}

export class MedicineMatch extends ProductMatch {
  constructor(dto: FilterMedicineProps) {
    super(dto);
  }
}
