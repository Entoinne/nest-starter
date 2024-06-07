import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { PasswordService } from './utils/password.service';
import { GetAllUsersService } from './use-case/getAllUsers';
import { CreateUserService } from './use-case/createUser';
import { GetUserByIdService } from './use-case/getUserById';
import { GetUsersByBirthCityService } from './use-case/getUsersByBirthCity';
import { UpdateUserService } from './use-case/updateUser';
import { UpdateUserPasswordService } from './use-case/updateUserPassword';
import { GetProfileService } from './use-case/getProfile';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [PasswordService, GetAllUsersService, CreateUserService, GetUserByIdService, GetUsersByBirthCityService,
    UpdateUserService, UpdateUserPasswordService, GetProfileService],

})
export class UserModule { }

// {
//   provide: CreateUserService,
//   useFactory: (passwordHasherService: PasswordHasherServiceInterface) => {
//     return new CreateUserService(passwordHasherService);
//   },
//   inject: [PasswordService],
// }