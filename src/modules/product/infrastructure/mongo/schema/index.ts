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

  @Prop({ required: true, type: mongoose.SchemaTypes.Decimal128 })
  original_price: number;

  @Prop({ required: true, type: mongoose.SchemaTypes.Decimal128 })
  price: number;

  @Prop({ default: [] })
  images: Array<string>;

  @Prop({ required: true, type: mongoose.SchemaTypes.String, default: "" })
  description: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Number, default: null })
  quantity: number | null;
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
