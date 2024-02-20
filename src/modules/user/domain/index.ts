interface Props {
  id: string;
  password: string;
}

export class User {
  private _id: string;
  private _password: string;

  constructor({ id, password }: Props) {
    this._id = id;
    this._password = password;
  }

  get id() {
    return this._id;
  }

  get password() {
    return this._password;
  }
}
