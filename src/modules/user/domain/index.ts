import { AdminUser } from "./Admin";
import { User, UserPopulated, UserSimple } from "./User";
import { UserMessage } from "./UserMessage";

export interface CurrentUser {
  id: string;
}

export { AdminUser, User, UserMessage, UserPopulated, UserSimple };
