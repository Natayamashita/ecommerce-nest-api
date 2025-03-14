import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

@Schema()
export class Product {
  @Prop({ default: () => new Types.ObjectId() })
  @Expose({ name: 'user_id' })
  _id: string;

  @Prop()
  @Expose()
  sku: string;

  @Prop()
  @Exclude()
  description: string;

  @Prop()
  @Expose()
  name: string;

  @Prop()
  @Expose()
  category: string;

  @Prop()
  @Expose()
  price: number;

  @Prop()
  @Expose()
  stock: number;

  @Prop()
  @Expose()
  unity_measure: string;

  @Prop()
  @Expose()
  status: boolean;

  constructor(init: Product) {
    Object.assign(this, init);
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);