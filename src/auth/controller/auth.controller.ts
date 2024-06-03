import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { LoginService } from '../use-case/login';

// @Controller('articles')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('users')
export class AuthController {
  // injection de dépendance
  // permet d'instancier la classe ArticleService
  // dans la propriété articleService
  constructor(
    private readonly loginService: LoginService,
  ) { }

  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  @Post('login')
  createUser(@Body() data: { username: string, password: string }) {
    return this.loginService.login(data);
  }
}