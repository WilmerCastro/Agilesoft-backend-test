import {Todo} from "../../domain/models/todo.model";
import {TodoStatusEnum} from "../../../shared/enums/todo-status.enum";
import {User} from "../../domain/models/user.model";

export abstract class TodoUseCase {
    public abstract findAll(): Promise<Todo[]>;
    public abstract findOne(id: string): Promise<Todo>;
    public abstract create(userId: string, todo: Todo): Promise<Todo>;
    public abstract delete(id: string, user: User): Promise<void>;
    public abstract updateStatus(id: string, status: TodoStatusEnum, user: User): Promise<Todo>;
    public abstract findByUserId(userId: string): Promise<Todo[]>;
}
