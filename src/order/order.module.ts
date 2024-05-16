import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/createOrder';
import { GetOrdersService } from './use-case/getOrders';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [CreateOrderService, GetOrdersService],

})
export class OrderModule { }

// {
//   provide: CreateUserService,
//   useFactory: (passwordHasherService: PasswordHasherServiceInterface) => {
//     return new CreateUserService(passwordHasherService);
//   },
//   inject: [PasswordService],
// }