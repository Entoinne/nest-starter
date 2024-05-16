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
}
