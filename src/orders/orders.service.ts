import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryBuilder } from 'src/common/builders/query.builder';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrdersDto } from './dto/filter-orders.dto';

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

  async findAll(
    userId: string | number,
    filters: FilterOrdersDto,
  ): Promise<Order[]> {
    const query = new QueryBuilder({ user_id: userId })
      .addDateRange('created_at', filters.date_from, filters.date_to)
      .addStringFilter('status', filters.status, true)
      .addStringFilter('city', filters.city)
      .addStringFilter('name', filters.name)
      .build();

    return this.orderModel
      .find(query)
      .populate('user_id')
      .sort({ created_at: -1 })
      .exec();
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
