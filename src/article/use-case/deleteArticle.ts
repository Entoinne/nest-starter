import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { OrderItem } from 'src/order/entity/orderItem.entity';

Injectable();
export class DeleteArticle {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) { }

  async deleteArticle(productId: number) {

    const orderItem = await this.orderItemRepository.findOne({
      where: {
        productId: { id: productId }
      }
    });

    if (orderItem) {
      throw new Error('Cannot delete article because it is in use');
    }

    return await this.articleRepository.delete(productId);
  }

}
