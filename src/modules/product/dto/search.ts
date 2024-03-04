export interface SearchProductDTO {
  query: string;
  page: number;
  minPrice: number;
  maxPrice: number;
  provider: string;
}

export interface SearchClotheDTO extends SearchProductDTO {
  colors: Array<string>;
  sizes: Array<string>;
}
