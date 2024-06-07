import { MaxLength } from 'class-validator';
import { OrderItem } from '../entity/orderItem.entity';
import { ItemOrderDto } from './item-order.dto';

export class OrderCreateDto {
  items: ItemOrderDto[];
  customer: string;
}