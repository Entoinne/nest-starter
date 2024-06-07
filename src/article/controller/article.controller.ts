import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArticleCreateDto } from '../dto/article-create.dto';
import { ArticleUpdateDto } from '../dto/article-update.dto';
import { GetAllArticles } from '../use-case/getAllArticles';
import { GetOneArticleById } from '../use-case/getOneArticleById';
import { CreateArticle } from '../use-case/createArticle';
import { UpdateArticle } from '../use-case/updateArticle';
import { DeleteArticle } from '../use-case/deleteArticle';
import { GetArticlesByAuthor } from '../use-case/getArticlesByAuthor';
import { AuthGuard } from 'src/auth/use-case/auth.guard';


@UseGuards(AuthGuard)
@Controller('articles')
export class ArticleController {

  constructor(private readonly getAllArticlesService: GetAllArticles,
    private readonly getOneArticleByIdService: GetOneArticleById,
    private readonly createArticleService: CreateArticle,
    private readonly updateArticleService: UpdateArticle,
    private readonly deleteArticleService: DeleteArticle,
    private readonly getArticlesByAuthorService: GetArticlesByAuthor,
  ) { }


  @Get()
  getAllArticles() {
    return this.getAllArticlesService.getAllarticles();
  }

  @Get(':id')
  getOneArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.getOneArticleByIdService.getOneArticleById(id);
  }

  @Post()
  createArticle(@Body() data: ArticleCreateDto) {
    return this.createArticleService.createArticle(data);
  }

  @Put(':id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ArticleUpdateDto,
  ) {
    return this.updateArticleService.updateArticle(id, data);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteArticleService.deleteArticle(id);
  }

  @Get('search/:author')
  getArticlesByAuthor(@Param('author') author: string) {
    return this.getArticlesByAuthorService.getArticlesByAuthor(author);
  }
}
