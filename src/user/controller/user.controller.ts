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
import { GetProfileService } from '../use-case/getProfile';

@Controller('users')
export class UserController {

  constructor(private readonly createUserService: CreateUserService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getUsersByBirthCityService: GetUsersByBirthCityService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
    private readonly getProfileService: GetProfileService,
  ) { }

  @Post()
  createUser(@Body() data: UserCreateDto) {
    return this.createUserService.createUser(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.getAllUsersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.getUserByIdService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get('ville/:birthCity')
  getUsersByBirthCity(
    @Param('birthCity') birthCity: string,
  ) {
    return this.getUsersByBirthCityService.getUsersByBirthCity(birthCity);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Post('profile')
  @UseGuards(AuthGuard)
  getProfile(@Body() username: string) {
    return this.getProfileService.getProfileByUsername(username);
  }
}
