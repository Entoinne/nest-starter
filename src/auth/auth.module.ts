import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { LoginService } from './use-case/login';
import { User } from 'src/user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from 'src/user/utils/password.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'slt-les-gens',
      signOptions: { expiresIn: '9999999999999999s' },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginService, PasswordService],

})
export class AuthModule { }