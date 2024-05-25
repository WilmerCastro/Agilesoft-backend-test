import {ApiProperty} from "@nestjs/swagger";
import {TodoStatusEnum} from "../../../../../shared/enums/todo-status.enum";
import {IsEnum} from "class-validator";

export class UpdateTodoDto {
    @ApiProperty({ enum: TodoStatusEnum })
    @IsEnum(TodoStatusEnum)
    status: TodoStatusEnum;
}
