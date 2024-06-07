import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';
import { PasswordService } from '../utils/password.service';

Injectable();
export class CreateUserService {
  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHasherService: PasswordService,
  ) { }


  async createUser(data: UserCreateDto) {
    try {
      const passwordHashed = await this.passwordHasherService.hashPassword(data.password);
      return this.userRepository.save({ ...data, password: passwordHashed });
    } catch (error) {
      throw new Error('Error while creating article');
    }
  }

}
