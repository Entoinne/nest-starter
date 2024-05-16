import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/createOrder';
import { GetOrdersService } from './use-case/getOrders';
import { updateOrderPaidService } from './use-case/updateOrderPaid';
import { updateOrderShippingAddressService } from './use-case/updateOrderShippingAddressService';
import { updateOrderInvoiceAddressService } from './use-case/updateOrderInvoiceAddressService';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [CreateOrderService, GetOrdersService, updateOrderPaidService, updateOrderShippingAddressService, updateOrderInvoiceAddressService],

})
export class OrderModule { }