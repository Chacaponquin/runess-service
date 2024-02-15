import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserEmail } from '@modules/user/value-object';

@Schema({ timestamps: true, autoCreate: true })
export class User {
  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String
  })
  firstName: string;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String
  })
  lastName: string;

  @Prop({
    default: null,
    unique: true,
    type: mongoose.SchemaTypes.String,
    validate: {
      validator: (value: string) => {
        return UserEmail.emailRegex.test(value);
      }
    },
    required: true
  })
  email: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  password: string | null;

  @Prop({ default: null, type: mongoose.SchemaTypes.String })
  image: string | null;

  @Prop({ type: mongoose.SchemaTypes.String })
  phone: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  country: string;
}
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

export { UserSchema };
