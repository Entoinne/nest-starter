import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/createOrder';
import { GetOrdersService } from './use-case/getOrders';
import { updateOrderPaidService } from './use-case/updateOrderPaid';
import { updateOrderShippingAddressService } from './use-case/updateOrderShippingAddressService';
import { updateOrderInvoiceAddressService } from './use-case/updateOrderInvoiceAddressService';
import { OrderItem } from './entity/orderItem.entity';
import { GetOrdersByCustomerService } from './use-case/getOrdersByCustomer';
import { GetCartByCustomerService } from './use-case/getCartByCustomer';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [CreateOrderService, GetOrdersService, updateOrderPaidService, updateOrderShippingAddressService, updateOrderInvoiceAddressService, GetOrdersByCustomerService, GetCartByCustomerService],

})
export class OrderModule { }