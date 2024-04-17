import { IImage } from "@modules/media/infrastructure/mongo/schemas";
import { PRODUCT_TYPES } from "@modules/product/constants";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";

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

  @Prop({ required: true, type: mongoose.SchemaTypes.Number, min: 0 })
  originalPrice: number;

  @Prop({ required: true, type: mongoose.SchemaTypes.Number, min: 0 })
  price: number;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.Array,
    ref: DB_MOELS.IMAGES,
  })
  images: Array<IImage>;

  @Prop({ required: false, type: mongoose.SchemaTypes.String, default: "" })
  description: string;

  @Prop({ required: false, type: mongoose.SchemaTypes.Number, default: null })
  quantity: number | null;

  @Prop({ default: 0, min: 0, type: mongoose.SchemaTypes.Number })
  views: number;

  @Prop({ default: 0, type: mongoose.SchemaTypes.Number, min: 0 })
  favoritesCount: number;

  @Prop({ type: mongoose.SchemaTypes.Array, default: [] })
  tags: Array<string>;

  @Prop({ type: mongoose.SchemaTypes.Array, required: true, minlength: 1 })
  categories: Array<string>;

  @Prop({
    required: true,
    enum: [PRODUCT_TYPES.CLOTHE, PRODUCT_TYPES.MEDICINE],
    type: mongoose.SchemaTypes.String,
  })
  type: PRODUCT_TYPES;
}

export type IProduct = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
