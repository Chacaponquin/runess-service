class Category {
  static create(name: string, subs: Array<Category>) {
    if (subs.length === 0) {
      return new SimpleCategory(name);
    } else {
      return new ParentCategory(name, subs);
    }
  }
}

class SimpleCategory extends Category {
  constructor(readonly _name: string) {
    super();
  }

  name(prev: string[]): string {
    const route = [...prev, this._name];
    return route.join("/");
  }
}

class ParentCategory extends Category {
  constructor(
    readonly _name: string,
    readonly subs: Array<Category>,
  ) {
    super();
  }

  names(prev: string[]): string[] {
    let allNames: Array<string> = [];

    for (const sub of this.subs) {
      if (sub instanceof ParentCategory) {
        const subNames = sub.names([...prev, this._name]);
        allNames = [...allNames, ...subNames];
      } else if (sub instanceof SimpleCategory) {
        allNames = [...allNames, sub.name([...prev, this._name])];
      }
    }

    return allNames;
  }
}

export class Categories {
  private readonly _clothes: Array<Category>;
  private readonly _medicines: Array<Category>;

  private generate(array: Array<Category>): string[] {
    let all = [];

    array.forEach((c) => {
      if (c instanceof ParentCategory) {
        all = [...all, ...c.names([])];
      } else if (c instanceof SimpleCategory) {
        all = [...all, c.name([])];
      }
    });

    return all;
  }

  get clothes(): string[] {
    return this.generate(this._clothes);
  }

  get medicines(): string[] {
    return this.generate(this._medicines);
  }

  constructor() {
    this._clothes = [
      Category.create("Hombre", [
        Category.create("Joyería", []),
        Category.create("Zapato", []),
        Category.create("Gorro", []),
        Category.create("Pantalón", []),
        Category.create("Camiseta", []),
        Category.create("Camisa", []),
      ]),

      Category.create("Niño", [
        Category.create("Camiseta", []),
        Category.create("Gorro", []),
      ]),

      Category.create("Mujer", [
        Category.create("Joyería", []),
        Category.create("Gorro", []),
      ]),
    ];

    this._medicines = [
      Category.create("Antibiótico", []),
      Category.create("Antiinflamatorio", []),
      Category.create("Antihipertensivo", []),
      Category.create("Antidepresivo", []),
      Category.create("Antiulceroso", []),
      Category.create("Anticoagulante", []),
    ];
  }
}
