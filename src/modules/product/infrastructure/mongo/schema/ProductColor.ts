import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class ProductColor {
  @Prop({ unique: true, required: true, type: mongoose.SchemaTypes.String })
  name: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Array })
  hex: string;
}

export type IProductColor = ProductColor & Document;
export const ProductColorSchema = SchemaFactory.createForClass(ProductColor);
