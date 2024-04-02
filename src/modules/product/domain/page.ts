interface Props {
  page: number;
  step: number;
}

export class Page {
  readonly init: number;
  readonly final: number;

  constructor({ page, step }: Props) {
    this.init = (page - 1) * step;
    this.final = (page - 1) * step + step;
  }
}

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
