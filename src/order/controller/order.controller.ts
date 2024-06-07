import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderCreateDto } from '../dto/order-create.dto';
import { CreateOrderService } from '../use-case/createOrder';
import { GetOrdersService } from '../use-case/getOrders';
import { updateOrderPaidService } from '../use-case/updateOrderPaid';
import { OrderUpdateShippingAddressDto } from '../dto/order-update-shipping-address.dto';
import { updateOrderShippingAddressService } from '../use-case/updateOrderShippingAddressService';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';
import { updateOrderInvoiceAddressService } from '../use-case/updateOrderInvoiceAddressService';
import { AuthGuard } from 'src/auth/use-case/auth.guard';
import { GetOrdersByCustomerService } from '../use-case/getOrdersByCustomer';
import { GetCartByCustomerService } from '../use-case/getCartByCustomer';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {

  constructor(
    private readonly createorderService: CreateOrderService,
    private readonly getOrdersService: GetOrdersService,
    private readonly updateOrderPaidService: updateOrderPaidService,
    private readonly updateOrderShippingAddressService: updateOrderShippingAddressService,
    private readonly updateOrderInvoiceAddressService: updateOrderInvoiceAddressService,
    private readonly getOrdersByCustomerService: GetOrdersByCustomerService,
    private readonly getCartByCustomerService: GetCartByCustomerService,
  ) { }

  @Post()
  createOrder(@Body() data: OrderCreateDto) {
    return this.createorderService.createOrder(data);
  }

  @Get()
  getOrders() {
    return this.getOrdersService.getOrders();
  }

  @Get(':customer')
  getOrdersByCustomer(
    @Param('customer') customer: string,
  ) {
    return this.getOrdersByCustomerService.getOrdersByCustomer(customer);
  }

  @Put('/payment/:id')
  updateOrderPaid(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.updateOrderPaidService.updateOrderPaid(id);
  }

  @Put('/shipping/:id')
  updateOrderShippingAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateShippingAddressDto,
  ) {
    return this.updateOrderShippingAddressService.updateOrderShippingAddress(id, data.shippingAddress, data.shippingMethod, data.invoiceAddress);
  }

  @Put('/invoice/:id')
  updateOrderInvoiceAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateInvoiceAddressDto,
  ) {
    return this.updateOrderInvoiceAddressService.updateOrderInvoiceAddress(id, data.invoiceAddress);
  }

  @Get('/cart/:customer')
  getCartByCustomer(
    @Param('customer') customer: string,
  ) {
    return this.getCartByCustomerService.getCartByCustomer(customer);
  }
}
