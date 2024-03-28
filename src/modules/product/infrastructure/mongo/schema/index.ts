import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";

export type IProduct = Product & Document;
export type IClothe = Clothe & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class Product {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  name: string;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
  })
  provider: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Decimal128, min: 0 })
  originalPrice: number;

  @Prop({ required: true, type: mongoose.SchemaTypes.Decimal128, min: 0 })
  price: number;

  @Prop({ required: true, type: mongoose.SchemaTypes.Array })
  images: Array<string>;

  @Prop({ required: false, type: mongoose.SchemaTypes.String, default: "" })
  description: string;

  @Prop({ required: false, type: mongoose.SchemaTypes.Number, default: null })
  quantity: number | null;

  @Prop({ default: 0, min: 0, type: mongoose.SchemaTypes.Number })
  views: number;

  @Prop({ type: mongoose.SchemaTypes.Array, default: [] })
  tags: Array<string>;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  category: string;
}

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class Clothe {
  @Prop({
    required: true,
    ref: DB_MOELS.PRODUCTS,
    type: mongoose.SchemaTypes.ObjectId,
  })
  product: IProduct;

  @Prop({ required: true, type: mongoose.SchemaTypes.Array })
  colors: Array<string>;

  @Prop({ required: true, type: mongoose.SchemaTypes.Array })
  sizes: Array<string>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export const ClotheSchema = SchemaFactory.createForClass(Clothe);
