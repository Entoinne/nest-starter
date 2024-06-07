import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';

Injectable();
export class GetOneArticleById {
  constructor(

    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) { }
  async getOneArticleById(id: number) {
    try {
      const article = await this.articleRepository.findOneBy({ id });
      if (!article) {
        throw new Error('Article not found');
      } else {
        return article;
      }
    } catch {
      throw new Error('Article not found');
    }
  }
}
