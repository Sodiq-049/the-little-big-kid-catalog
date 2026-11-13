import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Product photos taken from the admin dashboard are stored in MongoDB so they
// survive redeploys on hosts without persistent disk.
@Schema({ timestamps: true })
export class Image {
  @Prop({ required: true })
  data!: Buffer;

  @Prop({ required: true })
  contentType!: string;
}

export type ImageDocument = HydratedDocument<Image>;
export const ImageSchema = SchemaFactory.createForClass(Image);
