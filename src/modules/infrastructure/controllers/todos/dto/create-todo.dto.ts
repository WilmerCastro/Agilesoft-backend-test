import {
  IsNotEmpty,
  IsBoolean, IsEnum, ValidateNested, IsString,
} from 'class-validator';
import {Todo} from "../../../../domain/models/todo.model";
import {ApiProperty} from "@nestjs/swagger";
import {TodoStatusEnum} from "../../../../../shared/enums/todo-status.enum";
export class CreateTodoDto extends Todo {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: TodoStatusEnum })
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;

  @ApiProperty()
  @IsString()
  description: string;

}
