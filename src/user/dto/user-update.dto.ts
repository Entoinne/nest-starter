import { MinLength } from 'class-validator';

export class UserUpdateDto {
  @MinLength(5)
  username: string;

  @MinLength(8)
  password: string;
}
