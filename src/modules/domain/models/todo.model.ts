import {User} from "./user.model";
import {TodoStatusEnum} from "../../../shared/enums/todo-status.enum";
import {ApiProperty} from "@nestjs/swagger";

export class Todo {
    id?: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: TodoStatusEnum })
    status: TodoStatusEnum;

    @ApiProperty()
    description: string;
    user: User;
    created_at?: Date;
    updated_at?: Date;
}
