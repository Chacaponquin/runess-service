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

interface UserMessageProps {
  id: string;
  message: string;
  fullName: string;
  email: string;
}

export class UserMessage {
  readonly id: string;
  readonly message: string;
  readonly fullName: string;
  readonly email: string;

  constructor({ email, fullName, id, message }: UserMessageProps) {
    this.id = id;
    this.message = message;
    this.email = email;
    this.fullName = fullName;
  }
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
