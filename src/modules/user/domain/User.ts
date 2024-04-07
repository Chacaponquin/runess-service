import { Product } from "@modules/product/domain";

interface UserProps {
  id: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export abstract class User {
  readonly id: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;

  constructor({ id, password, firstName, lastName, email }: UserProps) {
    this.id = id;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export class UserSimple extends User {
  readonly favorites: Array<string>;

  constructor(props: UserProps & { favorites: Array<string> }) {
    super(props);
    this.favorites = props.favorites;
  }
}

export class UserPopulated extends User {
  readonly favorites: Array<Product>;

  constructor(props: UserProps & { favorites: Array<Product> }) {
    super(props);
    this.favorites = props.favorites;
  }
}
