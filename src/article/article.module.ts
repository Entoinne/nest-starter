import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { ArticleController } from './controller/article.controller';
import { GetArticlesByAuthor } from './use-case/getArticlesByAuthor';
import { GetAllArticles } from './use-case/getAllArticles';
import { DeleteArticle } from './use-case/deleteArticle';
import { GetOneArticleById } from './use-case/getOneArticleById';
import { CreateArticle } from './use-case/createArticle';
import { UpdateArticle } from './use-case/updateArticle';
import { OrderItem } from 'src/order/entity/orderItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, OrderItem])],
  controllers: [ArticleController],
  providers: [GetAllArticles, GetOneArticleById, DeleteArticle, GetArticlesByAuthor, CreateArticle, UpdateArticle],
})
export class ArticleModule { }
