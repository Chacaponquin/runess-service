import { IUser } from "@modules/user/infrastructure/mongo/schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";

export type IClient = Client & Document;

@Schema()
class Client {
  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  firstName: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  lastName: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  email: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  address: string;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: DB_MOELS.USERS,
  })
  user: IUser | null;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  phone: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
