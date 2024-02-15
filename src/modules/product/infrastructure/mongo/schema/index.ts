import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, autoCreate: true })
class Product {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  name: string;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String
  })
  provider: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Decimal128 })
  original_price: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Decimal128 })
  price: string;

  @Prop({ default: [] })
  images: Array<string>;

  @Prop({ required: true, type: mongoose.SchemaTypes.String, default: '' })
  description: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Number, default: null })
  quantity: number | null;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
