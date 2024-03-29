interface Props {
  name: string;
  key: string;
  size: number;
  id: string;
}

export class Image {
  readonly id: string;
  readonly key: string;
  readonly name: string;
  readonly size: number;

  constructor({ id, key, name, size }: Props) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.size = size;
  }
}
