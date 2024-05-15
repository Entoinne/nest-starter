import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';
import { CreateUserService } from '../use-case/createUser';

// @Controller('articles')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('users')
export class UserController {
  // injection de dépendance
  // permet d'instancier la classe ArticleService
  // dans la propriété articleService
  constructor(private readonly createUserService: CreateUserService) { }

  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  @Post()
  createArticle(@Body() data: UserCreateDto) {
    return this.createUserService.createUser(data);
  }
}
