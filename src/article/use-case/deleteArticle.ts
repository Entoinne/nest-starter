import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';

Injectable();
export class DeleteArticle {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) { }

  async deleteArticle(id: number) {
    return await this.articleRepository.delete(id);
  }

  //Commentaire : Après que le service ait été instancié, 
  //et appelé par le controller, on instancie le repository à l'entité Article,
  //et on utilise les méthodes du repository pour effectuer des opérations sur la base de données faites par l'ORM.
}
