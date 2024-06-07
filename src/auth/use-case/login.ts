import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { PasswordService } from 'src/user/utils/password.service';
import { Repository } from 'typeorm';

Injectable();
export class LoginService {
  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHasherService: PasswordService,
    private readonly jwsService: JwtService,
  ) { }


  async login(data: { username: string, password: string }): Promise<{ access_token: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { username: data.username } });

      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await this.passwordHasherService.comparePassword(data.password, user.password);
      if (!isPasswordValid) {
        throw new Error('Password is not valid');
      } else {
        return {
          access_token: await this.jwsService.signAsync({ id: user.id, username: user.username }),
        };
      }
    } catch (error) {
      throw new Error('User not found in db');
    }
  }
}
