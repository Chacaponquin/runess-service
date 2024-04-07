import { IProduct } from "@modules/product/infrastructure/mongo/schema";
import { UserEmail } from "@modules/user/value-object";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class User {
  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
  })
  firstName: string;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
  })
  lastName: string;

  @Prop({
    unique: true,
    type: mongoose.SchemaTypes.String,
    validate: {
      validator(value: string) {
        return UserEmail.emailRegex.test(value);
      },
    },
    required: true,
  })
  email: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  password: string;

  @Prop({ type: mongoose.SchemaTypes.String, default: null })
  image: string | null;

  @Prop({ type: mongoose.SchemaTypes.String, default: null })
  phone: string | null;

  @Prop({ type: mongoose.SchemaTypes.String, default: null })
  country: string | null;

  @Prop({
    type: mongoose.SchemaTypes.Array,
    default: [],
    required: false,
    ref: DB_MOELS.PRODUCTS,
  })
  favorites: Array<mongoose.Types.ObjectId>;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type IUser = User & Document;

export type IUserPopulated = Omit<IUser, "favorites"> & {
  favorites: Array<IProduct>;
};
