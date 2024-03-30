import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { IUser } from "./User";
import { DB_MOELS } from "@shared/constants";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class UserMessage {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    default: null,
    required: false,
    ref: DB_MOELS.USERS,
  })
  user: IUser | null;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  fullName: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  message: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  email: string;
}

export const UserMessageSchema = SchemaFactory.createForClass(UserMessage);
export type IUserMessage = UserMessage & Document;
