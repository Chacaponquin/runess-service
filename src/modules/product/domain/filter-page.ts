export class FilterPage {
  readonly init: number;
  readonly final: number;

  constructor(page: number) {
    this.init = (page - 1) * 25;
    this.final = (page - 1) * 25 + 25;
  }
}
