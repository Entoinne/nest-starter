import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';

@Entity()
export class Order {

  constructor(createOrderDto: OrderCreateDto) {
    if (createOrderDto) {
      if (Object.keys(createOrderDto.items).length > 3) throw new Error("More than 3 items are not allowed");
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.paidAt = new Date();
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

  @Column({ nullable: true })
  paidAt: Date;

  @Column()
  customer: string;

  @Column('json')
  items: JSON;

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
    this.status = 'shipping';
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
}
