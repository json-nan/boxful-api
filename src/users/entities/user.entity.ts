import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  last_name: string;

  @Prop({ required: true, trim: true })
  gender: string;

  @Prop({ required: true })
  birth_date: Date;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
