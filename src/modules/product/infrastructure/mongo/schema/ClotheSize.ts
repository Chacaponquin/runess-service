import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class ClotheSize {
  @Prop({ unique: true, name: mongoose.SchemaTypes.String, required: true })
  name: string;
}

export type IClothe = ClotheSize & Document;
export const ClotheSchema = SchemaFactory.createForClass(ClotheSize);
