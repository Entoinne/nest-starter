import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { ItemOrderDto } from "../dto/item-order.dto";
import { Article } from "src/article/entity/article.entity";

@Entity()
export class OrderItem {

    constructor(orderItem: ItemOrderDto) {
        if (orderItem) {
            this.quantity = orderItem.quantity;
            this.price = orderItem.price;
            this.id = orderItem.id;
        }
    }
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Article, article => article.id)
    productId: Article;

    @Column()
    quantity: number;

    @Column('numeric', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Order, order => order.id)
    order: Order;
}