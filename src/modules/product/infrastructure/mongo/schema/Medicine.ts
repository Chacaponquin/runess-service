import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";
import { IProduct } from "./Product";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class Medicine {
  @Prop({
    required: true,
    ref: DB_MOELS.PRODUCTS,
    type: mongoose.SchemaTypes.ObjectId,
  })
  product: IProduct;
}

export type IMedicine = Medicine & Document;

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
