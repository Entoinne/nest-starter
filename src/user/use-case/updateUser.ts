import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserUpdateDto } from '../dto/user-update.dto';
import { PasswordService } from '../utils/password.service';

Injectable();
export class UpdateUserService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(User)
    private readonly articleRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) { }


  async updateUser(id: number, data: UserUpdateDto) {
    // on récupère l'article ciblé
    const user = await this.articleRepository.findOneBy({ id });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'article
    if (data.password) {
      data.password = await this.passwordService.hashPassword(data.password);
    }
    const userUpdated = { ...user, ...data };
    // on sauvegarde l'article mis à jour
    await this.articleRepository.save(userUpdated);

    return userUpdated;
  }

  //Commentaire : Après que le service ait été instancié, 
  //et appelé par le controller, on instancie le repository à l'entité Article,
  //et on utilise les méthodes du repository pour effectuer des opérations sur la base de données faites par l'ORM.
}
