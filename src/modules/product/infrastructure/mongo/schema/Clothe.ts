import mongoose from "mongoose";
import { IProduct } from "./Product";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";

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
  colors: string[];

  @Prop({ required: true, type: mongoose.SchemaTypes.Array })
  sizes: string[];
}

export type IClothe = Clothe & Document;
export const ClotheSchema = SchemaFactory.createForClass(Clothe);
