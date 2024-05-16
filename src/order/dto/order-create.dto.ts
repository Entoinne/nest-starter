import { MaxLength } from 'class-validator';

export class OrderCreateDto {
  @MaxLength(3)
  items: JSON;

}
