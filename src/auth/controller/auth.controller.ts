import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from '../use-case/login';
import { AuthGuard } from '../use-case/auth.guard';

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