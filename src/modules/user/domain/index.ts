interface UserProps {
  id: string;
  password: string;
}

interface AdminUserProps {
  id: string;
  password: string;
  username: string;
  email: string;
}

export class User {
  readonly id: string;
  readonly password: string;

  constructor({ id, password }: UserProps) {
    this.id = id;
    this.password = password;
  }
}

export class AdminUser {
  readonly id: string;
  readonly password: string;
  readonly username: string;
  readonly email: string;

  constructor({ email, id, password, username }: AdminUserProps) {
    this.email = email;
    this.id = id;
    this.password = password;
    this.username = username;
  }
}
