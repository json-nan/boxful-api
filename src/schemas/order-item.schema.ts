import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type OrderItemDocument = HydratedDocument<OrderItem>;

@Schema()
export class OrderItem extends Document {
  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ default: 'created', trim: true })
  status: string;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
