interface Props {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class Client {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;

  constructor({ email, firstName, id, lastName, phone }: Props) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
}
