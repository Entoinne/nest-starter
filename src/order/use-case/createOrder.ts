import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { Order } from '../entity/order.entity';

Injectable();
export class CreateOrderService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) { }


  async createOrder(data: OrderCreateDto) {
    try {
      const order = new Order(data);
      return this.orderRepository.save(order);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }

  //Commentaire : Après que le service ait été instancié, 
  //et appelé par le controller, on instancie le repository à l'entité Article,
  //et on utilise les méthodes du repository pour effectuer des opérations sur la base de données faites par l'ORM.
}
