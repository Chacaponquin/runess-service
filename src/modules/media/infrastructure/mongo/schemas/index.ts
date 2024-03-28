import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Image {
  @Prop({ type: mongoose.SchemaTypes.Number, required: true })
  size: number;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  aws_key: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  name: string;
}

export type IImage = Image & Document;

export const ImageSchema = SchemaFactory.createForClass(Image);
