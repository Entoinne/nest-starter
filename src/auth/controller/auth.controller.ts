import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { LoginService } from '../use-case/login';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly loginService: LoginService,
  ) { }

  @Post('login')
  createUser(@Body() data: { username: string, password: string }) {
    return this.loginService.login(data);
  }

}