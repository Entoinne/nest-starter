import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';

Injectable();
export class updateOrderInvoiceAddressService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) { }


  async updateOrderInvoiceAddress(id: number, invoiceAddress: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      const updatedOrder = order.updateInvoiceAddress(invoiceAddress);
      return this.orderRepository.save(updatedOrder);
    } catch (error) {
      throw new Error('Error while creating article');
    }
  }

  //Commentaire : Après que le service ait été instancié, 
  //et appelé par le controller, on instancie le repository à l'entité Article,
  //et on utilise les méthodes du repository pour effectuer des opérations sur la base de données faites par l'ORM.
}
