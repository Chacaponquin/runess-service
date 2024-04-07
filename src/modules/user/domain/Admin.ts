interface AdminUserProps {
  id: string;
  password: string;
  username: string;
  email: string;
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
