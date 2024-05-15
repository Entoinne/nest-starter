import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';
import { PasswordService } from '../utils/password.service';

Injectable();
export class CreateUserService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) { }


  async createUser(data: UserCreateDto) {
    try {
      return this.userRepository.save({ ...data, password: await this.passwordService.hashPassword(data.password) });
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }

  //Commentaire : Après que le service ait été instancié, 
  //et appelé par le controller, on instancie le repository à l'entité Article,
  //et on utilise les méthodes du repository pour effectuer des opérations sur la base de données faites par l'ORM.
}
