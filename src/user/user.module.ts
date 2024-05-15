import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { CreateUserService } from './use-case/createUser';
import { PasswordService } from './utils/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUserService, PasswordService],
})
export class UserModule { }
