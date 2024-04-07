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

export class GetPage extends Page {
  constructor(page: number) {
    super({ page: page, step: 20 });
  }
}
