interface Props {
  page: number;
  step: number;
}

export class Page {
  readonly init: number;
  readonly final: number;

  private readonly step: number;

  constructor({ page, step }: Props) {
    this.step = step;

    this.init = (page - 1) * step;
    this.final = (page - 1) * step + step;
  }

  total(t: number): number {
    if (t > 0) {
      return Number.parseInt(String(t / this.step));
    } else {
      return 0;
    }
  }
}

export class GetPage extends Page {
  constructor(page: number) {
    super({ page: page, step: 20 });
  }
}
