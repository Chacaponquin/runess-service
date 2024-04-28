import { chaca, schemas } from "chaca";
import { RespUserOrderDTO } from "../../dto/user";

export class GetUserOrders {
  async execute(): Promise<RespUserOrderDTO[]> {
    const product = chaca.schema({
      name: schemas.lorem.words(),
      provider: schemas.word.noun(),
      id: schemas.id.uuid(),
      price: schemas.dataType.float({ precision: 2, max: 100, min: 1 }),
      image: schemas.image.food(),
      quantity: schemas.dataType.int({ min: 1, max: 5 }),
    });

    const schema = chaca.schema({
      id: schemas.id.uuid(),
      amount: schemas.dataType.float({ precision: 2, max: 500, min: 1 }),
      date: schemas.date.past(),
      products: { type: product, isArray: { min: 1, max: 15 } },
      no: schemas.dataType.int({ min: 1000, max: 9999 }),
      note: schemas.lorem.paragraphs({ paragraphsCount: 1 }),
    });

    const result = schema.generate(10);

    return result;
  }
}
