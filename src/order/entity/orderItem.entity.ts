import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { ItemOrderDto } from "../dto/item-order.dto";

@Entity()
export class OrderItem {

    constructor(orderItem: ItemOrderDto) {
        if (orderItem) {
            this.product = orderItem.product;
            this.quantity = 1;
            this.price = 10;
        }
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product: string;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 6, scale: 2, nullable: false })
    price: number;

    @ManyToOne(() => Order, order => order.items)
    order: Order;
}