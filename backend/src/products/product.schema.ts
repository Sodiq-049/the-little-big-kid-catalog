import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const BRANCHES = ['Lekki', 'Ikoyi', 'All'] as const;
export const AGE_GROUPS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9-16',
  'adult',
] as const;
export const GENDERS = ['boys', 'girls'] as const;

export type Branch = (typeof BRANCHES)[number];

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name!: string;

  // Kept as display strings (e.g. "45,000") to match the existing catalog data
  @Prop({ required: true, trim: true })
  price!: string;

  @Prop({ default: '', trim: true })
  wrappingPrice!: string;

  @Prop({ required: true })
  img!: string;

  @Prop({ default: '', trim: true })
  url!: string;

  // "All" means the product shows in both Lekki and Ikoyi
  @Prop({ required: true, enum: BRANCHES, default: 'All' })
  branch!: Branch;

  // A product can show under several ages, e.g. ['1', '2', '3']
  @Prop({ type: [String], enum: AGE_GROUPS, default: [] })
  ageGroups!: string[];

  @Prop({ enum: GENDERS })
  gender?: string;

  // Preserves the original catalog ordering; new products sort after it
  @Prop({ default: () => Date.now() })
  order!: number;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
