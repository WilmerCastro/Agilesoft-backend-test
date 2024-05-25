import {IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import {User} from "../../../../domain/models/user.model";
import {ApiProperty} from "@nestjs/swagger";
import {Todo} from "../../../../domain/models/todo.model";

export class CreateUserDto extends User {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
