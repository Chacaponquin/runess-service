import { UserEmail } from "@modules/user/value-object";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class AdminUser {
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

  @Prop({ type: mongoose.SchemaTypes.String, required: true, unique: true })
  username: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  password: string;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
export type IAdmin = AdminUser & Document;
