import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { ArticleUpdateDto } from '../dto/article-update.dto';

Injectable();
export class UpdateArticle {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) { }


  async updateArticle(id: number, data: ArticleUpdateDto) {
    // on récupère l'article ciblé
    const article = await this.articleRepository.findOneBy({ id });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'article
    const articleUpdate = { ...article, ...data };
    // on sauvegarde l'article mis à jour
    await this.articleRepository.save(articleUpdate);

    return articleUpdate;
  }

  //Commentaire : Après que le service ait été instancié, 
  //et appelé par le controller, on instancie le repository à l'entité Article,
  //et on utilise les méthodes du repository pour effectuer des opérations sur la base de données faites par l'ORM.
}
