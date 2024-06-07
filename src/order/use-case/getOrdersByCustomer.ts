import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';

Injectable();
export class GetOrdersByCustomerService {
    constructor(

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }


    async getOrdersByCustomer(customer: string) {
        try {
            return await this.orderRepository.findBy({ customer: customer });
        } catch (error) {
            throw new Error('Error while creating article');
        }
    }

    //Commentaire : Après que le service ait été instancié, 
    //et appelé par le controller, on instancie le repository à l'entité Article,
    //et on utilise les méthodes du repository pour effectuer des opérations sur la base de données faites par l'ORM.
}
