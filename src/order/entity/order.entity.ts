import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderItem } from './orderItem.entity';
import { ItemOrderDto } from '../dto/item-order.dto';
@Entity()
export class Order {

  constructor(createOrderDto: OrderCreateDto) {
    if (createOrderDto) {
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.status = "in cart";
      this.items = [];
      this.addItems(createOrderDto.items.map((item) => item));
      this.customer = createOrderDto.customer;
      this.total = createOrderDto.items.reduce((acc, item) => acc + item.price, 0);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  paidAt: Date;

  @Column()
  customer: string;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column()
  status: string;

  @Column()
  total: number;


  @Column({ nullable: true })
  invoiceAddress: string;

  @Column({ nullable: true })
  shippingAddress: string;

  @Column({ nullable: true })
  shippingMethod: string;

  @Column({ nullable: true })
  invoiceAddressSetAt: Date;

  @Column({ nullable: true })
  shippingMethodSetAt: Date;

  updateOrder(data: OrderCreateDto) {
    if (!this) {
      throw new Error('Order not found');
    }
    this.updatedAt = new Date();
    this.addItems(data.items.map((item) => item));

    this.total = this.items.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
    return this;
  }

  pay() {
    if (!this) {
      throw new Error('Order not found');
    }
    if (this.status === 'paid') throw new Error('Order already paid');
    if (this.status === 'shipping') throw new Error('Order already shipped');
    this.status = 'paid';
    this.paidAt = new Date();
    this.updatedAt = new Date();
    return this;
  }

  updateShippingAddress(shippingAddress: string, shippingMethod: string, invoiceAddress?: string) {
    if (!this) {
      throw new Error('Order not found');
    }
    if (!shippingAddress || !shippingMethod) throw new Error('Shipping address and shipping method are required');
    this.shippingMethod = shippingMethod;
    this.shippingAddress = shippingAddress;
    this.updatedAt = new Date();
    this.shippingMethodSetAt = new Date();
    this.invoiceAddressSetAt = new Date();
    this.status = 'ready to ship';
    if (!invoiceAddress) {
      this.invoiceAddress = shippingAddress;
    } else {
      this.invoiceAddress = invoiceAddress;
    }
    return this;
  }

  updateInvoiceAddress(invoiceAddress: string) {
    if (!this) {
      throw new Error('Order not found');
    }
    if (!invoiceAddress) throw new Error('Invoice address is required');
    if (this.status === 'shipping') throw new Error('Order already shipped');
    this.invoiceAddress = invoiceAddress;
    this.updatedAt = new Date();
    this.invoiceAddressSetAt = new Date();
    return this;
  }

  private addItems(items: ItemOrderDto[]) {
    console.log('items', items);
    console.log('this.items', this.items);


    items.forEach((item) => {
      const existingItem = this.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items = [...this.items, new OrderItem({ id: item.id, product: item.product, quantity: item.quantity, price: item.price, productId: item.productId })];
      }
    });
  }
}
