import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    userId: string | number,
  ): Promise<Order> {
    const order = new this.orderModel({
      ...createOrderDto,
      user_id: userId,
    });
    return order.save();
  }

  async findOne(id: string, userId: string | number): Promise<Order> {
    const order = await this.orderModel
      .findOne({ _id: id, user_id: userId })
      .populate('user_id')
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
