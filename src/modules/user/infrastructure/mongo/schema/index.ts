import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserEmail } from "@modules/user/value-object";

export type IUser = User & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
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
    default: null,
    unique: true,
    type: mongoose.SchemaTypes.String,
    validate: {
      validator: (value: string) => {
        return UserEmail.emailRegex.test(value);
      },
    },
    required: true,
  })
  email: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  password: string | null;

  @Prop({ type: mongoose.SchemaTypes.String, default: null })
  image: string | null;

  @Prop({ type: mongoose.SchemaTypes.String, default: null })
  phone: string;

  @Prop({ type: mongoose.SchemaTypes.String, default: null })
  country: string;
}
const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
