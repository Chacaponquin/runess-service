export interface SendUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  favorites: Array<string>;
}

export interface SendUserOrderDTO {
  amount: number;
}
