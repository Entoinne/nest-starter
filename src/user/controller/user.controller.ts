import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';
import { CreateUserService } from '../use-case/createUser';
import { GetAllUsersService } from '../use-case/getAllUsers';
import { GetUserByIdService } from '../use-case/getUserById';
import { GetUsersByBirthCityService } from '../use-case/getUsersByBirthCity';
import { UpdateUserService } from '../use-case/updateUser';
import { UpdateUserPasswordService } from '../use-case/updateUserPassword';
import { AuthGuard } from 'src/auth/use-case/auth.guard';

// @Controller('articles')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('users')
export class UserController {
  // injection de dépendance
  // permet d'instancier la classe ArticleService
  // dans la propriété articleService
  constructor(private readonly createUserService: CreateUserService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getUsersByBirthCityService: GetUsersByBirthCityService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
  ) { }

  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  @Post()
  createUser(@Body() data: UserCreateDto) {
    return this.createUserService.createUser(data);
  }

  @Get()
  getAllUsers() {
    return this.getAllUsersService.getAllUsers();
  }

  @Get(':id')
  getUserById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.getUserByIdService.getUserById(id);
  }

  @Get('ville/:birthCity')
  getUsersByBirthCity(
    @Param('birthCity') birthCity: string,
  ) {
    return this.getUsersByBirthCityService.getUsersByBirthCity(birthCity);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserCreateDto,
  ) {
    return this.updateUserService.updateUser(id, data);
  }

  @UseGuards(AuthGuard)
  @Put(':id/password')
  updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() password: string,
  ) {
    return this.updateUserPasswordService.updateUserPassword(id, password);
  }
}
