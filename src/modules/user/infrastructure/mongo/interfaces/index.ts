export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  image: string | null;
  phone: string | null;
}
