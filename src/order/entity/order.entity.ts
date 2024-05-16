import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';

@Entity()
export class Order {

  constructor(createOrderDto: OrderCreateDto) {
    if (createOrderDto) {
      if (Object.keys(createOrderDto.items).length > 3) throw new Error("More than 3 items are not allowed");
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.status = "pending";
      this.total = 12;
      this.items = createOrderDto.items;
      this.customer = "test";
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  customer: string;

  @Column('json')
  items: JSON;

  @Column()
  status: string;

  @Column()
  total: number;

}
