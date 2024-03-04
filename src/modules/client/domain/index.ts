interface Props {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

export class Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;

  constructor({ address, email, firstName, id, lastName, phone }: Props) {
    this.id = id;
    this.address = address;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
}
