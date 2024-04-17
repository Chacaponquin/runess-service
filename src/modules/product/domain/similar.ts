interface Props<T> {
  product: T;
  similarity: number;
}

export class SimilarProduct<T> {
  readonly product: T;
  readonly similarity: number;

  constructor({ product, similarity }: Props<T>) {
    this.product = product;
    this.similarity = similarity;
  }
}
