import { IUser } from "@modules/user/infrastructure/mongo/schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";

@Schema()
class Client {
  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  firstName: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  lastName: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  email: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: false, default: "" })
  address: string;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: DB_MOELS.USERS,
  })
  user: mongoose.Types.ObjectId | null;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  phone: string;
}

export type IClient = Client & Document;
export type IClientPopulated = Omit<IClient, "user"> & { user: IUser };

export const ClientSchema = SchemaFactory.createForClass(Client);
