import { IUser } from "@modules/user/infrastructure/mongo/schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";

export type IUserPayment = UserPayment & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class UserPayment {
  @Prop({ ref: DB_MOELS.USERS, type: mongoose.Types.ObjectId, required: true })
  user_id: IUser;

  @Prop({ type: mongoose.SchemaTypes.Decimal128, required: true })
  amount: number;

  @Prop({ type: mongoose.SchemaTypes.Date, required: true })
  expiration_date: Date;

  @Prop({ default: false, type: mongoose.SchemaTypes.Boolean })
  completed: boolean;
}
const UserPaymentSchema = SchemaFactory.createForClass(UserPayment);

export { UserPaymentSchema };
