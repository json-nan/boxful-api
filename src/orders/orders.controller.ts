import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/iam/interfaces/active-user';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.ordersService.create(createOrderDto, user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return this.ordersService.findOne(id, user.sub);
  }

  @Get('export-excel')
  exportExcel() {
    // TODO: Implement Excel export functionality
    return { message: 'Excel export endpoint - to be implemented' };
  }
}
