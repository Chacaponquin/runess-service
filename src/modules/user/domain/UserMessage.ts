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
