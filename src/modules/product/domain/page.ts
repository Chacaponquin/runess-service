import { Page } from "@shared/domain/page";

export class FilterPage extends Page {
  constructor(page: number) {
    super({ page: page, step: 25 });
  }
}

export class SepecificProductsPage extends Page {
  constructor(page: number) {
    super({ page: page, step: 4 });
  }
}
