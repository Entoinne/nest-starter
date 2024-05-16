import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrderCreateDto } from '../dto/order-create.dto';
import { CreateOrderService } from '../use-case/createOrder';
import { GetOrdersService } from '../use-case/getOrders';
import { updateOrderPaidService } from '../use-case/updateOrderPaid';
import { OrderUpdateShippingAddressDto } from '../dto/order-update-shipping-address.dto';
import { updateOrderShippingAddressService } from '../use-case/updateOrderShippingAddressService';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';
import { updateOrderInvoiceAddressService } from '../use-case/updateOrderInvoiceAddressService';

// @Controller('articles')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('orders')
export class OrderController {
  // injection de dépendance
  // permet d'instancier la classe ArticleService
  // dans la propriété articleService
  constructor(
    private readonly createorderService: CreateOrderService,
    private readonly getOrdersService: GetOrdersService,
    private readonly updateOrderPaidService: updateOrderPaidService,
    private readonly updateOrderShippingAddressService: updateOrderShippingAddressService,
    private readonly updateOrderInvoiceAddressService: updateOrderInvoiceAddressService,
  ) { }

  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  @Post()
  createOrder(@Body() data: OrderCreateDto) {
    return this.createorderService.createOrder(data);
  }

  @Get()
  getOrders() {
    return this.getOrdersService.getOrders();
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
}
