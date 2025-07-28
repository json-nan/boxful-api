import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { OrderItem, OrderItemSchema } from './order-item.schema';
import { User } from './user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Order extends Document {
  @Prop({ required: true, trim: true })
  pickup_address: string;

  @Prop({ required: true })
  programmed_date: Date;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  last_name: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ required: true, trim: true })
  deliver_address: string;

  @Prop({ required: true, trim: true })
  city: string;

  @Prop({ required: true, trim: true })
  municipality: string;

  @Prop({ required: true, trim: true })
  reference_place: string;

  @Prop({ required: true, trim: true })
  indications: string;

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ default: 'created', trim: true })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
